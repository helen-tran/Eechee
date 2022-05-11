import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../Context/UserContext";

const AssigneeSearchBar = ({ task, setTask, setNames, names }) => {
  const { users } = useContext(UserContext);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [ids, setIds] = useState([]);
  const [text, setText] = useState();

  //   filter for the assignee search bar
  const handleFilter = (event) => {
    setText(event.target.value);
    const searchUser = text.toLowerCase();
    const newFilter = users.filter((user) => {
      const fullName = (user.firstName + " " + user.lastName).toLowerCase();
      return fullName.includes(searchUser);
    });
    setFilteredUsers(newFilter);
  };

  //   setting assignees ids to the task to send to back end
  useEffect(() => {
    setTask({ ...task, assignees: ids });
  }, [ids]);
  return (
    <Wrapper>
      <SearchWrapper>
        <Input
          placeholder="add assignees"
          onChange={handleFilter}
          value={text}
        />
      </SearchWrapper>
      {filteredUsers.length != 0 && (
        <Results>
          {filteredUsers.map((user, key) => {
            const _id = user._id;
            const fullName = user.firstName + " " + user.lastName;
            return (
              <NameButton
                key={_id}
                onClick={() => {
                  setIds([...ids, _id]);
                  setNames([...names, fullName]);
                  setText("");
                }}
              >
                {user.firstName} {user.lastName}
              </NameButton>
            );
          })}
        </Results>
      )}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  color: #347193;
  text-align: left;
  border: 1.5px solid #347193;
  font-family: "roc-grotesk";
  font-weight: 400;
  font-size: 18px;
  background: none;
  outline: none;
  color: #347193;
  width: 380px;
  border-radius: 10px;
  padding-left: 8px;
`;
const SearchWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
const Results = styled.div`
  border: 1.5px solid #347193;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  width: 380px;
  height: 80px;
  overflow: hidden;
  overflow-y: auto;
  margin-top: 10px;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const NameButton = styled.button`
  text-align: left;
  background: transparent;
  color: #347193;
  width: 380px;
  height: 25px
  padding-left: 8px;
  margin-bottom: 5px;
  border: none;
  &:hover {
    background: #347193;
    color: #f8f7f7;
    transition: 0.2s;
  }
`;
export default AssigneeSearchBar;
