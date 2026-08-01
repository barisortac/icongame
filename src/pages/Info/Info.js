import React from 'react'
import {Flex, Link, Text, Box} from '@chakra-ui/react'
import {Divider} from "@chakra-ui/layout";

const Info = () => {
  return (
    <Flex width="100%" justifyContent="center">
      <Flex flexDirection="column" mt="3em" fontSize="sm" maxW="24em" textAlign="center" alignItems="center">
        <Divider mt="1em" mb="1.5em" borderColor="whiteAlpha.300" />
        <Box bg="whiteAlpha.100" p="1.5em" borderRadius="lg" width="100%">
          <Text fontWeight="extrabold" fontSize="md" mb="0.5em" color="pink.300">
            Zeka Küpü Nedir? 🧠
          </Text>
          <Text mb="1em">
            Görsel hafızanı zorlayacak eğlenceli bir test! Ekrandaki ikonları aklında tut, süre bitmeden onları bul ve en yüksek puanı kap!
          </Text>
          <Text fontWeight="bold" fontSize="sm" color="blue.200">
            Ekin Yazıcı ve Barış Ortaç tarafından özenle geliştirildi.
          </Text>
        </Box>
      </Flex>
    </Flex>
  )
}

export default Info;
