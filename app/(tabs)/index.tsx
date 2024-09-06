import { TextStyle, View, ViewStyle } from "react-native";
import React from "react";
import { Text } from "../../components";

const index = () => {
  return (
    <View style={$container}>
      <View style={$introductionText}>
        <Text>Tarot Psychological Portrait</Text>
        <Text>
          Tarot Psychological Portrait is used to examine and analyze the innate
          potentials of a given individual, their talents and predispositions,
          the influences they were subjected to in childhood and to which they
          are susceptible in adult life. The best ways to realize emerging
          opportunities, significant and turning moments in life, as well as
          those hidden in the subconscious fears, complexes or, as it is called
          in esoteric language - things to work through. Using the archetypes
          written in the Major Arcana of the Tarot, substituting the appropriate
          cards for the numbers resulting from the date of birth allows one to
          see something like a genetic code with which a person comes into the
          world.
        </Text>
        <Text>
          This method, created by Alla Alicja Chrzanowska is taught in
          workshops, and the meaning of each item is explained thoroughly during
          the course.
        </Text>
      </View>
    </View>
  );
};

export default index;

const $container: ViewStyle = {
  flex: 1,
};
const $introductionText: TextStyle = {
  alignItems: "center",
  justifyContent: "center",
};
