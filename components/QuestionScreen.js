import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useAuth } from '../auth/authContext';
import jwt_decode from 'jwt-decode';
import { allChat } from '../api/auth';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import Loader from './Loader';



const QuestionScreen = () => {
  const navigation = useNavigation();


  const [allQuestion, setAllQuestion] = useState([])
  const { user, resultData, updateResponceData } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const getAllQuestion = () => {
    setIsLoading(true)
    if (!user) {
      console.log("token not found")
    }

    const decodedToken = jwt_decode(user);
    // console.log("the token",decodedToken)

    if (!decodedToken || !decodedToken.userId) {
      console.error("Invalid or missing userId in the token.");
      return;
    }


    const userId = decodedToken.userId;

    allChat(userId)
      .then((res) => {
        if (res) {
          setAllQuestion(res)
        }
        setIsLoading(false)

      })
      .catch((error) => {
        console.log("the error is ", error)
      })

  }

  useEffect(() => {
    getAllQuestion()
  }, [resultData])



  const handleQuestionSelect = (questionId) => {
    const selectedQuestion = allQuestion.find(
      (question) => question._id === questionId
    );

    if (selectedQuestion) {
      updateResponceData(selectedQuestion);
      navigation.dispatch(DrawerActions.closeDrawer());

    }
  }; return (

    <>
      <SafeAreaView style={styles.fixedItem}>
        <Text style={styles.fixedItemLabel}> All Questions</Text>
      </SafeAreaView>
      {
        isLoading ? <Loader color={'black'} size={40} /> : <DrawerContentScrollView>


          {
            allQuestion.map((questions, index) => (
              <DrawerItem
                key={questions._id}
                label={questions.question}
                icon={({ color, size }) => (
                  <Icon name="message" size={20} color={color} />
                )}
                labelStyle={styles.questionLabel}
                onPress={() =>
                  handleQuestionSelect(questions._id)
                }
              />
            ))
          }

        </DrawerContentScrollView>
      }




    </>
  );
};

const styles = StyleSheet.create({
  fixedItem: {
    backgroundColor: '#131717',
    marginVertical: 10,
    paddingLeft: 16,
    marginLeft: 0,
    marginRight: 0,
    padding: 8,
    borderRadius: 5
  },
  fixedItemLabel: {
    color: 'white',
    fontWeight: 'bold',
    padding: 8
  },
  questionLabel: {
    marginLeft: -5,
    paddingBottom: 3,
    margin: -4,
    padding: -4,
  },
});



export default QuestionScreen;
