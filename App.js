import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import {
  collection,
  addDoc,
  getDoc,
  setDoc,
  doc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import db from "./firebaseConfig";

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [inputData, setInputData] = useState({
    first: "",
    last: "",
  });

  // Function to add a document to Firestore
  const addDocument = async () => {
    try {
      setLoading(true);
      const docRef = await addDoc(collection(db, "user"), inputData);
      console.log("Document added with ID: ", docRef.id);
      // After adding the document, fetch updated data
      fetchData();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error adding document: ", error);
    }
  };

  // Function to fetch documents from Firestore
  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "user"));
      const documents = [];
      querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() });
      });

      setData(documents);

      await setDoc(doc(db, "user", "2NDu6XUBTbvVcujurlgf"), {
        first: "ikooooo",
        last: "wiryaaaa",
      });

      const docref = doc(db, "user", "guaRuuSCwL7alCDwisOE");
      const detail = await getDoc(docref);
      console.log("Update JSON Data : ");
      console.log(detail.data());
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const deleteUser = async (id) => {
    setLoadingData(true);
    const deleteRef = doc(db, "user", id);
    await deleteDoc(deleteRef);
    fetchData();
    setLoadingData(false);
  };

  useEffect(() => {
    // Call the fetchData function when the component mounts
    fetchData();
  }, []);

  return (
    <ScrollView style={{ marginTop: 45 }}>
      <View style={styles.container}>
        {/* Form to collect user input */}
        <TextInput
          style={styles.input}
          placeholder="First"
          onChangeText={(text) => setInputData({ ...inputData, first: text })}
          value={inputData.key1}
        />
        <TextInput
          style={styles.input}
          placeholder="Last"
          onChangeText={(text) => setInputData({ ...inputData, last: text })}
          value={inputData.key2}
        />
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Button title="Tambah Data" onPress={addDocument} />
        )}
        <Text style={{ fontWeight: "bold" }}>List Data</Text>
        {/* Add Firestore data rendering here */}
        {loadingData ? (
          <ActivityIndicator />
        ) : (
          data.map((item) => (
            <View
              key={item.id}
              style={{
                borderWidth: 1,
                padding: 8,
                marginVertical: 6,
                borderRadius: 8,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <Text>First: {item.first}</Text>
                  <Text>Last: {item.last}</Text>
                </View>
                <Button title="Hapus" onPress={() => deleteUser(item.id)} />
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 8,
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginVertical: 10,
  },
});
