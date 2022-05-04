import styled from "styled-components";
import { useEffect, useState } from "react";
import Tasks from "./Tasks";

const Lists = ({ projectId, projectName }) => {
  const [lists, setLists] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isInput, setIsInput] = useState(false);
  const [listName, setListName] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const fetchLists = () => {
    const lists = async () => {
      const response = await fetch(`/lists/${projectId}`);
      const data = await response.json();
      setLists(data.data);
      setHasLoaded(true);
    };
    lists();
  };

  useEffect(() => {
    fetchLists();
  }, []);

  const handleAddList = async (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ listName: listName, projectId: projectId }),
    };

    const response = await fetch("/lists", requestOptions);
    const data = await response.json();
    setIsInput(false);
    return fetchLists();
  };

  return (
    <>
      {hasLoaded ? (
        <ListsWrapper>
          {lists.map((list) => {
            const listName = list.listName;
            const listId = list._id;
            return (
              <ListWrapper>
                <ListName>{listName}</ListName>
                <Tasks
                  listId={listId}
                  projectName={projectName}
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                />
                <AddButton
                  onClick={() => {
                    setOpenModal(true);
                  }}
                >
                  +
                </AddButton>
              </ListWrapper>
            );
          })}
          <ListWrapper>
            {isInput ? (
              <>
                <Input
                  type="text"
                  placeholder="List Name"
                  onChange={(e) => setListName(e.target.value)}
                />
                <AddButton onClick={handleAddList}>+</AddButton>
              </>
            ) : (
              <>
                <ListName>add another lists</ListName>
                <AddButton
                  onClick={() => {
                    setIsInput(true);
                  }}
                >
                  +
                </AddButton>
              </>
            )}
          </ListWrapper>
        </ListsWrapper>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
};

const ListsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`;
const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1.5px solid #347193;
  border-radius: 30px;
  margin-right: 50px;
  padding: 20px 50px 20px 50px;
`;
const ListName = styled.h2`
  text-align: center;
`;
const AddButton = styled.button`
  border: 1.5px solid #347193;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  color: #347193;
  cursor: pointer;
  font-weight: 600;
  background: #f8f7f7;
  margin-right: 20px;
  margin-top: 20px;
  &:hover {
    background: #347193;
    color: #f8f7f7;
    transition: 0.2s;
  }
`;
const Input = styled.input`
  color: #347193;
  text-align: center;
  border: none;
  width: 280px;
  font-family: "antique-olive";
  font-weight: 400;
  font-size: 40px;
  background: none;
  outline: none;
  color: #347193;
`;
export default Lists;