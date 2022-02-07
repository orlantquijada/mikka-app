import React, { useState } from 'react'
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  Link,
  VStack,
  Text,
  Input,
  Alert,
} from 'native-base'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'
import { useMutation } from 'react-query'
import { RootStackParamList } from '../types'
import { login, LoginRequestBody } from '../api/lib/users'
import { AxiosError } from 'axios'

export default function LoginScreen() {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>()
  const [apiError, setApiError] = useState<string | undefined>('')

  const { mutate } = useMutation((body: LoginRequestBody) => login(body), {
    onError: (err: AxiosError<{ detail: string }>) =>
      setApiError(err.response?.data.detail),
  })

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginRequestBody>({
    defaultValues: { password: '', username: '' },
  })

  const onSubmit = (body: LoginRequestBody) => mutate(body)

  return (
    <Center w="100%" bgColor="white" flex={1}>
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: 'warmGray.50',
          }}
        >
          Welcome
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: 'warmGray.200',
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          Log in to continue!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl isInvalid={Boolean(errors.username?.message)}>
            <FormControl.Label>Username</FormControl.Label>
            <Controller
              name="username"
              control={control}
              rules={{ required: 'Enter your username' }}
              render={({ field: { onBlur, onChange, value } }) => (
                <Input
                  autoCapitalize="none"
                  value={value}
                  onChangeText={(text) => {
                    onChange(text)

                    if (apiError) setApiError('')
                  }}
                  onBlur={onBlur}
                />
              )}
            />
            <FormControl.ErrorMessage>
              {errors.username?.message}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.password?.message)}>
            <FormControl.Label>Password</FormControl.Label>

            <Controller
              name="password"
              control={control}
              rules={{ required: 'Enter your password' }}
              render={({ field: { onBlur, onChange, value } }) => (
                <Input
                  type="password"
                  autoCapitalize="none"
                  value={value}
                  onChangeText={(text) => {
                    onChange(text)

                    if (apiError) setApiError('')
                  }}
                  onBlur={onBlur}
                />
              )}
            />
            <FormControl.ErrorMessage>
              {errors.password?.message}
            </FormControl.ErrorMessage>
            <Link
              _text={{
                fontSize: 'xs',
                fontWeight: '500',
                color: 'indigo.500',
              }}
              alignSelf="flex-end"
              mt="1"
            >
              Forget Password?
            </Link>
          </FormControl>
          {apiError ? (
            <Alert w="100%" status="error">
              <HStack
                flexShrink={1}
                space={2}
                alignItems="center"
                justifyContent="flex-start"
              >
                <HStack space={2} flexShrink={1}>
                  <Alert.Icon mt="1" size="3" />
                  <Text fontSize="sm" color="coolGray.800">
                    {apiError}
                  </Text>
                </HStack>
              </HStack>
            </Alert>
          ) : null}

          <Button
            mt="2"
            colorScheme="indigo"
            onPress={handleSubmit(onSubmit)}
            isLoading={isSubmitting}
            isLoadingText="Loading"
          >
            Log in
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}
            >
              I'm a new user.{' '}
            </Text>
            <Link
              _text={{
                color: 'indigo.500',
                fontWeight: 'medium',
                fontSize: 'sm',
              }}
              onPress={() => navigate('Signup')}
            >
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  )
}
