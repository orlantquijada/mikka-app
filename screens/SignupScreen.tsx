import React, { useState } from 'react'
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  VStack,
  Text,
  Input,
  Alert,
  Link,
} from 'native-base'
import { useForm, Controller } from 'react-hook-form'
import { useMutation } from 'react-query'
import { SignupRequestBody, signup } from '../api/lib/users'
import { AxiosError } from 'axios'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../types'

export default function SignupScreen() {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>()
  const [apiError, setApiError] = useState<string | undefined>('')

  const { mutate } = useMutation((body: SignupRequestBody) => signup(body), {
    onError: (err: AxiosError<{ username: string[] }>) =>
      setApiError(err.response?.data.username[0]),
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SignupRequestBody>({
    defaultValues: { password: '', confirm_password: '', username: '' },
  })

  const onSubmit = (body: SignupRequestBody) => mutate(body)

  return (
    <Center w="100%" bgColor="white" flex={1}>
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading size="lg" fontWeight="600" color="coolGray.800">
          Welcome
        </Heading>
        <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
          Sign up to continue!
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
          <FormControl
            isInvalid={Boolean(
              errors.password?.message || errors.confirm_password?.message
            )}
          >
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
          </FormControl>
          <FormControl isInvalid={Boolean(errors.confirm_password?.message)}>
            <FormControl.Label>Confirm Password</FormControl.Label>

            <Controller
              name="confirm_password"
              control={control}
              rules={{
                required: 'Enter your password',
                validate: (value) =>
                  value !== getValues('password')
                    ? 'Passwords do not match'
                    : undefined,
              }}
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
              {errors.confirm_password?.message}
            </FormControl.ErrorMessage>
          </FormControl>
          {apiError ? (
            <Alert w="100%" status="error">
              <HStack flexShrink={1} space={2} alignItems="center">
                <HStack space={2} flexShrink={1} alignItems="center">
                  <Alert.Icon mt="1" size="3" />
                  <Text fontSize="sm" color="coolGray.800">
                    {apiError}
                  </Text>
                </HStack>
              </HStack>
            </Alert>
          ) : null}

          <Button mt="2" colorScheme="indigo" onPress={handleSubmit(onSubmit)}>
            Sign up
          </Button>

          <HStack mt="6" justifyContent="center">
            <Text fontSize="sm" color="coolGray.600">
              Already have an account?{' '}
            </Text>
            <Link
              _text={{
                color: 'indigo.500',
                fontWeight: 'medium',
                fontSize: 'sm',
              }}
              onPress={() => navigate('Login')}
            >
              Log in
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  )
}
