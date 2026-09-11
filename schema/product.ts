import { MAX_FILES } from "@/data/constants";
import { z } from "zod";
import { createFetchResponseSchema } from "./fetchResponse";
import { imageSchema } from "./image";
import { SizeOutputSchema } from "./sizeType";

export enum Gender {
  male = "male",
  female = "female",
  unisex = "unisex",
}

export enum ProductStatus {
  approved = "approved",
  pending = "pending",
  rejected = "rejected",
}

/*
  Output Schemas
  Base Schemas (Prisma returns null for nullable columns)
*/
const ProductOutputBaseSchema = z.object({
  id: z.cuid2(),
  name: z.string(),
  brand: z.string().nullable(),
  gender: z.enum(Gender),
  description: z.string(),
  productStatus: z.enum(ProductStatus),
  discountPercentage: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  categoryId: z.cuid2(),
  sizeTypeId: z.cuid2().nullable(),
  organizationId: z.cuid2(),
  vendorId: z.cuid2().nullable(),
});

const ProductImageOutputSchema = z.object({
  id: z.cuid2(),
  url: z.url(),
  productId: z.string(),
});

const TeamOutputSchema = z.object({
  id: z.cuid2(),
  name: z.string(),
  address: z.string(),
  organizationId: z.cuid2(),
  createdAt: z.string(),
  updatedAt: z.string().nullable(),
});

const TeamVariationOutputSchema = z.object({
  id: z.cuid2(),
  quantity: z.number(),
  variationId: z.cuid2(),
  teamId: z.cuid2(),
});

// price is a Prisma Decimal, serialized as a string over JSON
const VariationOutputSchema = z.object({
  id: z.cuid2(),
  sku: z.string(),
  color: z.string(),
  price: z.coerce.number(),
  createdAt: z.string(),
  productId: z.cuid2(),
  sizeId: z.cuid2().nullable(),
});

const VendorOutputSchema = z
  .object({ user: z.object({ name: z.string() }) })
  .nullable();

const ProductCountSchema = z.object({ variations: z.number() });

// Get
export const GetProductParamSchema = z.object({
  id: z.cuid2(),
});

export const GetProductOutputSchema = ProductOutputBaseSchema.extend({
  images: z.array(ProductImageOutputSchema),
  variations: z.array(
    VariationOutputSchema.extend({
      teamVariations: z.array(
        TeamVariationOutputSchema.extend({ team: TeamOutputSchema }),
      ),
      size: SizeOutputSchema.nullable(),
    }),
  ),
  category: z.object({ id: z.cuid2(), name: z.string() }),
  sizeType: z
    .object({ id: z.cuid2(), sizes: z.array(SizeOutputSchema) })
    .nullable(),
  _count: ProductCountSchema,
  vendor: VendorOutputSchema,
});
export type GetProductOutputData = z.infer<typeof GetProductOutputSchema>;

export type VariationOutputData = GetProductOutputData["variations"][number];

// Get All
export const GetAllProductQuerySchema = z.object({
  name: z.string().optional(),
  categoryId: z.cuid2().optional(),
  teamId: z.cuid2().optional(),
  organizationId: z.cuid2().optional(),
  organizationSlug: z.string().optional(),
  cursor: z.cuid2().optional(),
  pageSize: z.number().positive().optional(),
});

export const GetAllProductOutputSchema = createFetchResponseSchema(
  ProductOutputBaseSchema.pick({
    id: true,
    name: true,
    description: true,
    categoryId: true,
    createdAt: true,
    productStatus: true,
    brand: true,
  }).extend({
    images: z.array(ProductImageOutputSchema),
    vendor: VendorOutputSchema,
    _count: ProductCountSchema,
  }),
);
export type GetAllProductOutputData = z.infer<typeof GetAllProductOutputSchema>;

export type ProductListItemData = GetAllProductOutputData["data"][number];

/*
  Create
  The shape the API accepts. The form below works with a different shape
  (chakra selects hand back arrays) and transforms into this one.
*/
const CreateTeamVariationInputSchema = z.object({
  teamId: z.cuid2(),
  quantity: z.int().nonnegative(),
});

const CreateVariationInputSchema = z.object({
  color: z.string(),
  price: z.number(),
  sizeId: z.cuid2(),
  teamVariations: z.array(CreateTeamVariationInputSchema).min(1),
});

export const CreateProductInputSchema = z.object({
  name: z.string(),
  brand: z.string().optional(),
  gender: z.enum(Gender),
  description: z.string(),
  discountPercentage: z.number(),
  categoryId: z.cuid2(),
  sizeTypeId: z.cuid2(),
  variations: z.array(CreateVariationInputSchema).min(1),
  images: z.array(z.object({ url: z.url() })).min(1),
});
export type CreateProductInputData = z.infer<typeof CreateProductInputSchema>;

export const CreateProductOutputSchema = ProductOutputBaseSchema.extend({
  variations: z.array(
    VariationOutputSchema.extend({
      teamVariations: z.array(TeamVariationOutputSchema),
    }),
  ),
});

// Update
export const UpdateProductParamSchema = z.object({
  id: z.cuid2(),
});

export const UpdateProductInputSchema = CreateProductInputSchema.partial();
export type UpdateProductInputData = z.infer<typeof UpdateProductInputSchema>;
export const UpdateProductOutputSchema = ProductOutputBaseSchema;

// Delete
export const DeleteProductParamSchema = z.object({
  id: z.cuid2(),
});
export type DeleteProductParamData = z.infer<typeof DeleteProductParamSchema>;

export const DeleteVariationParamSchema = z.object({
  id: z.cuid2(),
});
export type DeleteVariationParamData = z.infer<
  typeof DeleteVariationParamSchema
>;

export const DeleteTeamVariationParamSchema = z.object({
  id: z.cuid2(),
});
export type DeleteTeamVariationParamData = z.infer<
  typeof DeleteTeamVariationParamSchema
>;

/*
  Form Schemas
  The output of these schemas is the create input the API expects.
*/
const teamVariationFormSchema = z.object({
  teamId: z
    .array(z.cuid2(), { error: "select a team" })
    .length(1, { error: "select one team" })
    .transform(([id]) => id),

  quantity: z
    .int({ error: "quantity is required" })
    .positive({ error: "quantity cannot be negative or zero" }),
});
export type TeamVariationFormValues = z.input<typeof teamVariationFormSchema>;

const variationFormSchema = z.object({
  color: z
    .string({ error: "color is required" })
    .regex(/^#[0-9a-fA-F]{6}$/, { error: "select a valid color" }),

  price: z
    .number({ error: "price is required" })
    .positive({ error: "price cannot be negative or zero" }),

  sizeId: z
    .array(z.cuid2(), { error: "select a size" })
    .length(1, { error: "select one size" })
    .transform(([id]) => id),

  teamVariations: z
    .array(teamVariationFormSchema)
    .min(1, { error: "add at least one team" })
    .superRefine((tv, ctx) => {
      const seen = new Set<string>();

      tv.forEach(({ teamId }, index) => {
        if (seen.has(teamId))
          ctx.addIssue({
            code: "custom",
            path: [index, "teamId"],
            message: "store is already selected",
          });

        seen.add(teamId);
      });
    }),
});
export type VariationFormValues = z.input<typeof variationFormSchema>;

export const productFormSchema = z.object({
  name: z
    .string({ error: "name is required" })
    .min(3, { error: "name must be at least 3 letters long" }),

  brand: z
    .string({ error: "brand is required" })
    .min(2, { error: "brand is required" })
    .optional(),

  gender: z.enum(Gender, { error: "select a gender" }),

  description: z
    .string({ error: "description is required" })
    .min(2, { error: "description is required" }),

  discountPercentage: z
    .number({ error: "discount is required" })
    .nonnegative({ error: "discount cannot be negative" })
    .max(100, { error: "discount can't exceed 100%" }),

  categoryId: z
    .array(z.cuid2(), { error: "select a product category" })
    .length(1, { error: "select one product category" })
    .transform(([id]) => id),

  sizeTypeId: z
    .array(z.cuid2(), { error: "select a size type" })
    .length(1, { error: "select one size type" })
    .transform(([id]) => id),

  variations: z
    .array(variationFormSchema)
    .min(1, { error: "add at least one variation" }),

  images: z
    .array(imageSchema)
    .min(1, { error: "add at least one image" })
    .max(MAX_FILES, { error: `at most ${MAX_FILES} images` })
    .transform((urls) => urls.map((url) => ({ url }))),
});
export type ProductData = z.infer<typeof productFormSchema>;
export type ProductFormValues = z.input<typeof productFormSchema>;

export const emptyProduct: ProductFormValues = {
  name: "",
  brand: "",
  gender: Gender.unisex,
  description: "",
  discountPercentage: 0,
  categoryId: [],
  sizeTypeId: [],
  images: [],
  variations: [],
};

export const emptyVariation: VariationFormValues = {
  color: "#000000",
  price: 0,
  sizeId: [],
  teamVariations: [],
};

export const emptyTeamVariation: TeamVariationFormValues = {
  teamId: [],
  quantity: 0,
};

export function formProduct(product: GetProductOutputData): ProductFormValues {
  return {
    ...product,
    brand: product.brand ?? undefined,
    images: product.images.map(({ url }) => url),
    categoryId: [product.category.id],
    sizeTypeId: product.sizeType ? [product.sizeType.id] : [],
    variations: product.variations.map((v) => ({
      color: v.color,
      price: v.price,
      // size is cleared when its Size row is deleted
      sizeId: v.size ? [v.size.id] : [],
      teamVariations: v.teamVariations.map((tv) => ({
        teamId: [tv.team.id],
        quantity: tv.quantity,
      })),
    })),
  };
}
