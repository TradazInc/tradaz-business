import { LogoContainer } from "@/app/components/LogoContainer";
import { ColorModeButton } from "@/components/ui/color-mode";
import { steps } from "@/data/homeSteps";
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";

const page = () => {
  const steps = [
    {
      id: 1,
      title: "Join",
      description: "Create your account in seconds to access the platform.",
    },
    {
      id: 2,
      title: "Create Business",
      description: "Register your brand and set up your business profile.",
    },
    {
      id: 3,
      title: "Create Store",
      description: "Add your collections and start selling to your customers.",
    },
  ];

  return (
    <Box bg="bg" minH="100vh">
      <Box
        w="full"
        top={0}
        bg="bg.panel"
        borderBottomWidth="1px"
        borderColor="bg.emphasized"
      >
        <Flex
          maxW="container.lg"
          mx="auto"
          px={{ base: 4, md: 8 }}
          py={2}
          align="center"
          justify="space-between"
        >
          <LogoContainer>Tradaz</LogoContainer>

          <HStack gap="4">
            <ColorModeButton rounded="full" />

            <HStack gap="2">
              <Link href="/signin">
                <Button
                  variant="ghost"
                  colorScheme="blue"
                  size="sm"
                  rounded="full"
                >
                  Login
                </Button>
              </Link>

              <Link href="/signup">
                <Button
                  colorScheme="blue"
                  size="sm"
                  px={6}
                  rounded="full"
                  fontWeight="bold"
                >
                  Join
                </Button>
              </Link>
            </HStack>
          </HStack>
        </Flex>
      </Box>

      <Container maxW="container.lg" pt={32} pb={20}>
        <VStack gap="6" textAlign="center" mb={24}>
          <Heading
            as="h1"
            size="3xl"
            fontWeight="extrabold"
            letterSpacing="tight"
          >
            Welcome to{" "}
            <Text as="span" color="green.500">
              Tradaz
            </Text>
          </Heading>

          <Text fontSize="xl" color="fg.muted" maxW="2xl">
            A tailored e-commerce platform for business owners. Streamline your
            operations, manage your brand, track sales and inventory and scale
            your growth seamlessly.
          </Text>

          <Link href="/signup">
            <Button
              size="sm"
              rounded="full"
              fontWeight="bold"
              px={10}
              py={5}
              fontSize="md"
            >
              Join
            </Button>
          </Link>
        </VStack>

        <Box as="section">
          <VStack gap="3" textAlign="center" mb={16}>
            <Heading as="h2" size="xl" fontWeight="bold">
              How to Join
            </Heading>
            <Text color="fg.muted" fontSize="lg">
              Get your business up and running in three simple steps.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 3 }} gap="10">
            {steps.map((step) => (
              <Box
                key={step.id}
                bg="bg.panel"
                p={8}
                rounded="2xl"
                borderWidth="1px"
                borderColor="bg.emphasized"
                textAlign="center"
                transition="transform 0.2s ease"
                _hover={{ transform: "translateY(-5px)" }}
              >
                <Flex
                  w={14}
                  h={14}
                  mx="auto"
                  bg="green.500"
                  color="white"
                  rounded="full"
                  align="center"
                  justify="center"
                  fontSize="2xl"
                  fontWeight="bold"
                  mb={6}
                >
                  {step.id}
                </Flex>
                <Heading as="h3" size="md" mb={4}>
                  {step.title}
                </Heading>
                <Text color="fg.muted" lineHeight="tall">
                  {step.description}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  );
};

export default page;
