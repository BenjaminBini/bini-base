import { hasLength, useForm } from "@mantine/form";
import {
  Button,
  Group,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useLogin } from "../api/user-api.js";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      username: hasLength({ min: 3, max: 50 }),
      password: hasLength({ min: 3, max: 50 }),
    },
  });

  const navigate = useNavigate();

  const login = useLogin();

  const onSubmit = () => {
    return form.onSubmit(async (values) => {
      const token = await login.mutateAsync(values); // TODO : manage error
      window.localStorage.setItem("token", token.data);
      const redirectTo = new URLSearchParams(window.location.search).get(
        "redirect",
      );
      navigate(redirectTo || "/");
    });
  };

  return (
    <Stack>
      <Title>Login</Title>
      <form onSubmit={onSubmit()}>
        <Stack>
          <TextInput
            data-autofocus
            withAsterisk
            label="Username"
            {...form.getInputProps("username")}
          />
          <PasswordInput
            withAsterisk
            label="Password"
            {...form.getInputProps("password")}
          />
          <Group position="left" mt="md">
            <Button
              variant="gradient"
              gradient={{ from: "indigo", to: "cyan" }}
              type="submit"
            >
              Login
            </Button>
          </Group>
        </Stack>
      </form>
    </Stack>
  );
}
