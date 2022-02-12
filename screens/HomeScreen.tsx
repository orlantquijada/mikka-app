import {
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  VStack,
} from 'native-base'
import { Controller, useForm } from 'react-hook-form'

interface FormValues {
  numOfEffects: string
}

export default function HomeScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {},
  })

  const onSubmit = (values: FormValues) => {
    const numOfEffects = parseInt(values.numOfEffects, 10)

    // replace code below with what ull do with the number of effects
    return numOfEffects
  }

  return (
    <Center w="100%" bgColor="white" flex={1}>
      <VStack space="3" w="60%" alignItems="center" mt="-20">
        <Heading size="sm" fontWeight="600" color="coolGray.800">
          Number of Effects
        </Heading>
        <FormControl isInvalid={Boolean(errors.numOfEffects?.message)}>
          <Controller
            name="numOfEffects"
            control={control}
            rules={{
              required: 'Enter number of effects',
            }}
            render={({ field: { onBlur, onChange, value } }) => (
              <Input
                autoCapitalize="none"
                value={value}
                keyboardType="decimal-pad"
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Enter Number"
                textAlign="center"
              />
            )}
          />
          <FormControl.ErrorMessage alignItems="center">
            {errors.numOfEffects?.message}
          </FormControl.ErrorMessage>
        </FormControl>

        <Button
          mt="2"
          colorScheme="indigo"
          onPress={handleSubmit(onSubmit)}
          w="50%"
        >
          Enter
        </Button>
      </VStack>
    </Center>
  )
}
