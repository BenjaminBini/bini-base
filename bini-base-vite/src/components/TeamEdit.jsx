import { Stack, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { useSaveTeam, useTeam } from "../api/teams-api.js";
import TeamForm from "./TeamForm.jsx";

export default function TeamEdit() {
  const { teamId } = useParams();
  const { data: team } = useTeam(teamId);
  const queryClient = useQueryClient();
  const saveTeam = useSaveTeam(queryClient);

  const onSubmit = async (team) => {
    await saveTeam.mutateAsync({ id: teamId, ...team });
    notifications.show({
      title: "Team saved",
      message: `Team "${team.label}" has been saved`,
    });
  };

  return (
    <Stack>
      <Title>Team {team?.label}</Title>
      {team && <TeamForm team={team} onSubmit={onSubmit} />}
    </Stack>
  );
}
