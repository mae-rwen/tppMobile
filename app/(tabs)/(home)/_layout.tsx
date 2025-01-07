import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen
        name="tpp"
        options={({ route }) => ({
          title: route.params?.user
            ? `Portrait for ${JSON.parse(route.params.user).name}`
            : "Portrait",
          headerShown: true,
        })}
      />
    </Stack>
  );
}
