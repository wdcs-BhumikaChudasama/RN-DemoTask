import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import UserDataComponent, { UserDataProps } from "./UserDataComponent";

interface ListData {
  listData: UserDataProps[];
  onEndReached: () => void;
  onDeleteBtnPressed: (item) => void;
}

const UserDataList: React.FC<ListData> = (props) => {
  const { listData, onEndReached, onDeleteBtnPressed } = props;
  const renderItem = ({ item }) => {
    return (
      <View style={{ margin: 10 }}>
        <UserDataComponent
          gender={item?.gender}
          name={item?.name}
          location={item?.location}
          picture={item?.picture}
          email={item?.email}
          dob={item?.dob}
          onDeleteBtnPressed={(item) => {
            onDeleteBtnPressed(item);
          }}
        />
      </View>
    );
  };

  const keyExtractor = (item: UserDataProps) => {
    return item.id;
  };
  return (
    <View style={styles.container}>
      <FlatList
        bounces={false}
        data={listData}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
        keyExtractor={keyExtractor}
        onEndReached={onEndReached}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
  },
});

export default UserDataList;
