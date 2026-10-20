"use client";

import { humanizeText } from "@/utilities/humanizeText";
import {
  Box,
  Checkbox,
  CheckboxGroup,
  SimpleGrid,
  Stack,
  Text,
  Wrap,
} from "@chakra-ui/react";
import { useId } from "react";

type Statements = Record<string, readonly string[]>;
export type Permission<S extends Statements> = Partial<
  Record<keyof S, string[]>
>;

type PermissionPickerProps<S extends Statements> = {
  /** Resource to allowed actions, e.g. `orgAc.statements`. */
  statements: S;
  value: Permission<S>;
  onChange: (value: Permission<S>) => void;
  onBlur?: () => void;
  disabled?: boolean;
  invalid?: boolean;
};

export const PermissionPicker = <S extends Statements>({
  statements,
  value,
  onChange,
  onBlur,
  disabled,
  invalid,
}: PermissionPickerProps<S>) => {
  // A surrounding Field.Root hands every checkbox the same input and label id,
  // so each one needs its own or every label click toggles the first checkbox.
  const id = useId();
  const idsFor = (...parts: string[]) => {
    const key = [id, ...parts].join("-");
    return { hiddenInput: `${key}-input`, label: `${key}-label` };
  };

  const setResource = (resource: keyof S, actions: string[]) => {
    const next = { ...value };
    if (actions.length) next[resource] = actions;
    else delete next[resource];
    onChange(next);
    onBlur?.();
  };

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
      {(Object.keys(statements) as (keyof S & string)[]).map((resource) => {
        const actions = statements[resource] ?? [];
        const selected = value[resource] ?? [];
        const all = selected.length === actions.length && actions.length > 0;
        const some = selected.length > 0 && !all;

        return (
          <Box
            key={resource}
            p={3}
            rounded={"md"}
            borderWidth={1}
            borderColor={invalid ? "border.error" : "border"}
          >
            <Stack gap={2}>
              <Checkbox.Root
                ids={idsFor(resource)}
                size={"sm"}
                variant={"subtle"}
                disabled={disabled}
                checked={all ? true : some ? "indeterminate" : false}
                onCheckedChange={({ checked }) =>
                  setResource(resource, checked === true ? [...actions] : [])
                }
              >
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label>
                  <Text fontWeight={"medium"}>{humanizeText(resource)}</Text>
                </Checkbox.Label>
              </Checkbox.Root>

              <CheckboxGroup
                value={selected}
                disabled={disabled}
                invalid={invalid}
                onValueChange={(actions) => setResource(resource, actions)}
              >
                <Wrap gap={3} ps={6}>
                  {actions.map((action) => (
                    <Checkbox.Root
                      key={action}
                      ids={idsFor(resource, action)}
                      value={action}
                      size={"sm"}
                    >
                      <Checkbox.HiddenInput />
                      <Checkbox.Control />
                      <Checkbox.Label>{humanizeText(action)}</Checkbox.Label>
                    </Checkbox.Root>
                  ))}
                </Wrap>
              </CheckboxGroup>
            </Stack>
          </Box>
        );
      })}
    </SimpleGrid>
  );
};
