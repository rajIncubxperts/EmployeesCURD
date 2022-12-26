import React from 'react';
import {
  StyleSheet,
  Modal,
} from 'react-native';
import PropupModel from './PropupModel';

const CustomModal = props => {
  
  const {visible, RequestClose, handleOnPress,description, title, setData, changeModalVisible} =
    props;

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      nRequestClose={RequestClose}>
      <PropupModel
        deleteHandler={handleOnPress}
        title={title}
        description={description}
        changeModalVisible={changeModalVisible}
        setData={setData}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({});
export default CustomModal;
