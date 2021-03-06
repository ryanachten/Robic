import React, {
  useState,
  useEffect,
  useRef,
  ElementRef,
  useContext,
} from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ExerciseForPost } from "../../reducers/exercise";
import { ExerciseDefinition, FormSet, Set } from "../../constants/Interfaces";
import { ErrorToast } from "../ErrorToast";
import { Button } from "../Button";
import { Stopwatch } from "../Stopwatch";
import { Margin } from "../../constants/Sizes";
import { Colors } from "../../constants/Colors";
import { Icon } from "../Icon";
import {
  ExerciseContext,
  ExerciseDefinitionContext,
} from "../../services/context";
import { PreviousAttempts } from "./PreviousAttempts";
import { EffortTillPersonalBest } from "./EffortTillPersonalBest";
import { SetList } from "./SetList";

export const ExerciseForm = ({
  definition: { id },
}: {
  definition: ExerciseDefinition;
}) => {
  const initialSet: FormSet[] = [{ reps: "1", value: "5" }];
  const [sets, setSets] = useState<FormSet[]>(initialSet);

  const {
    state: { loading, error },
    actions: { createExercise },
  } = useContext(ExerciseContext);
  const {
    state: definitionState,
    actions: { getDefinitionById },
  } = useContext(ExerciseDefinitionContext);

  const stopwatchRef = useRef<ElementRef<typeof Stopwatch>>(null);

  const navigation = useNavigation();

  // Reset form if definition ID changes
  useEffect(() => {
    setSets(initialSet);
    getDefinitionById(id);
  }, [id]);

  const updateSet = (index: number, field: "reps" | "value", value: string) => {
    const updatedSets = [...sets];
    updatedSets[index][field] = value;
    setSets(updatedSets);
  };

  const addSet = () => {
    const updatedSets = [{ ...sets[0] }, ...sets];
    setSets(updatedSets);
  };

  const removeSet = (index: number) => {
    const updatedSets = [...sets];
    updatedSets.splice(index, 1);
    setSets(updatedSets);
  };

  const submitExercise = async () => {
    const setsForSumission: Set[] = sets.map(({ reps, value }) => ({
      reps: parseFloat(reps),
      value: parseFloat(value),
    }));
    const exercise: ExerciseForPost = {
      sets: setsForSumission,
      definition: id,
    };
    if (!stopwatchRef.current) {
      return;
    }
    const { started, msec, sec, min } = stopwatchRef.current.state;
    if (started) {
      const timeTaken = new Date(0);
      timeTaken.setMilliseconds(msec);
      timeTaken.setSeconds(sec);
      timeTaken.setMinutes(min);
      exercise.timeTaken = timeTaken.toISOString();
    }
    await createExercise(exercise);

    // If there's an error, we don't clear state
    // to give user another attempt at submission
    if (!error) {
      setSets(initialSet);
      stopwatchRef.current.handleReset();
      navigation.navigate("Exercises", {
        screen: "ExerciseDetailScreen",
        params: {
          definitionId: id,
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <Stopwatch ref={stopwatchRef} />
      <View style={styles.buttonWrapper}>
        <Button
          appearance="outline"
          onPress={addSet}
          style={[styles.button, styles.addButton]}
          accessoryRight={() => (
            <Icon fill={Colors.orange} name="plus-circle-outline" size="sm" />
          )}
        >
          Add Set
        </Button>
        <Button
          style={styles.button}
          loading={loading}
          onPress={() => submitExercise()}
        >
          Done
        </Button>
      </View>
      <ScrollView>
        <PreviousAttempts id={id} definitionState={definitionState} />
        <EffortTillPersonalBest
          id={id}
          currentSets={sets}
          definitionState={definitionState}
        />
        <SetList sets={sets} updateSet={updateSet} removeSet={removeSet} />
      </ScrollView>
      <ErrorToast error={error} />
    </View>
  );
};

const styles = StyleSheet.create({
  addButton: {
    marginRight: Margin.md,
  },
  button: {
    width: "45%",
    flexGrow: 1,
  },
  buttonWrapper: {
    display: "flex",
    flexDirection: "row",
    marginBottom: Margin.md,
  },
  container: {
    flex: 1,
    flexGrow: 1,
    minWidth: "100%",
  },
});
