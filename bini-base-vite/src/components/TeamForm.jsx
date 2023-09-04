import { Button, Group, Stack, Text, TextInput } from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import { Link } from "react-router-dom";
import AutocompleteInput from "./ui/AutocompleteInput.jsx";
import { useFindUsersByUserName } from "../api/user-api.js";
import { IconUser } from "@tabler/icons-react";
import { forwardRef } from "react";

export default function TeamForm({ team, onSubmit }) {
  const form = useForm({
    initialValues: {
      label: team?.label || "",
      owner: {
        id: team?.owner?.id || null,
      },
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
        <AutocompleteInput
          icon={<IconUser size={18} />}
          label="Owner"
          useQuery={useFindUsersByUserName}
          initialItem={team?.owner || null}
          initialValue={team?.owner?.id || ""}
          initialLabel={team?.owner?.username || ""}
          valueField="id"
          labelField="username"
          formFieldId="owner.id"
          placeholder="Search for a user"
          form={form}
          itemComponent={UserSelectItem}
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
            Back
          </Button>
        </Group>
      </Stack>
    </form>
  );
}

const UserSelectItem = forwardRef(
  ({ username, email, createdDate, modifiedDate, ...props }, ref) => (
    <div ref={ref} {...props}>
      <Group noWrap>
        <Text size="sm">{username}</Text>
        <Text size="xs" opacity={0.65}>
          {email}
        </Text>
      </Group>
    </div>
  ),
);
