import React, { useEffect, useReducer, useState } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { Text } from "../components/Themed";
import { StackScreenProps } from "@react-navigation/stack";
import { ExercisesParamList } from "../types";
import {
  exerciseDefinitionReducer,
  exerciseDefinitionActions,
  initialExerciseDefinitionState,
} from "../reducers/exerciseDefinition";
import { ExerciseDefinition } from "../constants/Interfaces";
import { ErrorToast } from "../components/ErrorToast";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { formatDistance } from "date-fns";
import { Picker } from "native-base";
import { Button } from "react-native-elements";

enum SortBy {
  lastActive = "lastActive",
  lastImprovement = "lastImprovement",
}

type Props = StackScreenProps<ExercisesParamList, "ExercisesScreen">;

export default function ExercisesScreen({ navigation }: Props) {
  const [{ definitions, error, loading }, definitionDispatch] = useReducer(
    exerciseDefinitionReducer,
    initialExerciseDefinitionState
  );

  useEffect(() => {
    exerciseDefinitionActions(definitionDispatch).getDefinitions();
  }, []);

  const [sortBy, setSortBy] = useState<SortBy>(SortBy.lastActive);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button
        title="Create exercise"
        onPress={() => navigation.navigate("ExerciseEditScreen")}
      />
      <Picker note selectedValue={sortBy} onValueChange={setSortBy}>
        <Picker.Item label="Last active" value={SortBy.lastActive} />
        <Picker.Item label="Most improved" value={SortBy.lastImprovement} />
      </Picker>
      {loading && <ActivityIndicator size="large" />}
      {definitions
        ?.sort(sortBy === SortBy.lastActive ? sortByDate : sortByImprovment)
        .map(
          ({ id, title, lastActive, lastImprovement }: ExerciseDefinition) => (
            <TouchableOpacity
              key={id}
              style={styles.exerciseItem}
              onPress={() =>
                navigation.navigate("ExerciseDetailScreen", {
                  definitionId: id,
                })
              }
            >
              <Text>{title}</Text>
              {lastActive && (
                <Text style={styles.exerciseDate}>
                  {`${formatDistance(new Date(lastActive), Date.now())} ago`}
                </Text>
              )}
              {lastImprovement && (
                <Text style={styles.exerciseImprovement}>
                  {lastImprovement}
                </Text>
              )}
            </TouchableOpacity>
          )
        )}
      <ErrorToast error={error} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  exerciseItem: {
    flexDirection: "row",
    marginBottom: 10,
  },
  exerciseDate: {
    marginLeft: 10,
  },
  exerciseImprovement: {
    marginLeft: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

// Alphbetical sort fallback
const sortAlpha = (a: ExerciseDefinition, b: ExerciseDefinition) =>
  a.title > b.title ? 1 : -1;

const sortByImprovment = (
  a: ExerciseDefinition,
  b: ExerciseDefinition
): 1 | -1 => {
  // Handle date sorting
  const improvementA = a.lastImprovement;
  const improvementB = b.lastImprovement;

  if (improvementA !== null && improvementB !== null) {
    if (improvementA === improvementB) {
      return sortAlpha(a, b);
    }
    return improvementA < improvementB ? 1 : -1;
  }

  // Handle cases where dates don't exist
  if (improvementA && !improvementB) {
    return -1;
  } else if (!improvementA && improvementB) {
    return 1;
  }
  return sortAlpha(a, b);
};

const sortByDate = (a: ExerciseDefinition, b: ExerciseDefinition): 1 | -1 => {
  // Handle date sorting
  const dateA = a.lastActive && new Date(a.lastActive);
  const dateB = b.lastActive && new Date(b.lastActive);
  if (dateA instanceof Date && dateB instanceof Date) {
    if (dateA.getMilliseconds() === dateB.getMilliseconds()) {
      return sortAlpha(a, b);
    }
    return dateA < dateB ? 1 : -1;
  }

  // Handle cases where dates don't exist
  if (dateA && !dateB) {
    return -1;
  } else if (!dateA && dateB) {
    return 1;
  }
  return sortAlpha(a, b);
};
