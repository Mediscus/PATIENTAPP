import {
  SET_ADD_FAMILY_MEMBER_LOADER,
  SET_FAMILY_MEMBER_LIST_LOADER,
  SET_IS_OPEN_FAMILY_MEMBERS_MODAL,
  UPDATE_FAMILY_MEMBERS_LIST,
} from "../constants/reduxFormConstants";

const initialState = {
  isOpenFamilyMemberModal: false,
  familyMembersList: [],
  familyMemberListLoader: false,
  addFamilyMemberLoader: false,
};

function familyMembersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_IS_OPEN_FAMILY_MEMBERS_MODAL:
      return {
        ...state,
        isOpenFamilyMemberModal: action.payload,
      };
    case UPDATE_FAMILY_MEMBERS_LIST:
      return {
        ...state,
        familyMembersList: action.payload,
      };
    case SET_FAMILY_MEMBER_LIST_LOADER:
      return {
        ...state,
        familyMemberListLoader: action.payload,
      };
    case SET_ADD_FAMILY_MEMBER_LOADER:
      return {
        ...state,
        addFamilyMemberLoader: action.payload,
      };

    default:
      return state;
  }
}

export default familyMembersReducer;
