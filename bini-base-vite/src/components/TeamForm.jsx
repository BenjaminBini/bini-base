import { Button, Group, Stack, TextInput } from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import { Link } from "react-router-dom";

export default function TeamForm({ team, onSubmit }) {
  const form = useForm({
    initialValues: {
      label: team?.label || "",
    },
    validate: {
      label: hasLength({ min: 3, max: 50 }),
    },
  });

  const submit = (values) => {
    onSubmit({ ...values });
  };

  return (
    <form onSubmit={form.onSubmit(submit)}>
      <Stack>
        <TextInput
          withAsterisk
          label="Label"
          {...form.getInputProps("label")}
        />

        <Group position="left" mt="md">
          <Button
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan" }}
            type="submit"
          >
            Save
          </Button>
          <Button
            variant="outline"
            type="submit"
            component={Link}
            to="/admin/teams"
          >
            Cancel
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
