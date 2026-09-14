import TradazLogo from "@/components/custom/shared/TradazLogo";
import {
  Box,
  Center,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";

export default function StatusPage({
  icon,
  code,
  colorPalette = "gray",
  title,
  description,
  footnote,
  children,
}: {
  icon: React.ReactNode;
  code?: string;
  colorPalette?: string;
  title: string;
  description: string;
  footnote?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <Center bg="bg" minH="dvh" w="full" px={{ base: 4, md: 8 }} py={12}>
      <Stack gap={8} align="center" maxW="md" w="full">
        <TradazLogo />

        <Box
          bg="bg.panel"
          borderWidth="1px"
          borderColor="bg.emphasized"
          rounded="2xl"
          shadow="sm"
          px={{ base: 6, md: 10 }}
          py={{ base: 8, md: 10 }}
          w="full"
          textAlign="center"
          colorPalette={colorPalette}
        >
          <Stack gap={4} align="center">
            <Flex
              align="center"
              justify="center"
              boxSize={14}
              rounded="full"
              bg="colorPalette.subtle"
              color="colorPalette.fg"
            >
              <Icon boxSize={7}>{icon}</Icon>
            </Flex>

            {code && (
              <Text
                textStyle="xs"
                fontWeight="bold"
                letterSpacing="widest"
                color="colorPalette.fg"
              >
                ERROR {code}
              </Text>
            )}

            <Heading as="h1" size="lg" fontWeight="bold">
              {title}
            </Heading>

            <Text textStyle="sm" color="fg.muted" lineHeight="tall">
              {description}
            </Text>

            <Flex
              direction={{ base: "column", sm: "row" }}
              gap={3}
              justify="center"
              w="full"
              mt={2}
            >
              {children}
            </Flex>
          </Stack>
        </Box>

        {footnote}
      </Stack>
    </Center>
  );
}
