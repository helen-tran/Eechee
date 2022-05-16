import styled from "styled-components";
import { useContext, useState } from "react";
import { UserContext } from "../../../Context/UserContext";

const AddComment = ({ fetchTasks, _id }) => {
  const { currentUser } = useContext(UserContext);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState({
    userId: currentUser._id,
    name: currentUser.firstName + " " + currentUser.lastName,
    comment: "",
    time: new Date(),
  });

  // adding comment
  const handleAddComment = async (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment),
    };
    setLoading(true);
    const response = await fetch(`/task/${_id}`, requestOptions);
    const data = await response.json();
    setText("");
    setLoading(false);
    return fetchTasks();
  };
  return (
    <CommentWrapper>
      {currentUser.avatarImg === "" ? (
        <AvatarDefault />
      ) : (
        <AvatarImg src={currentUser.avatarImg} />
      )}
      <Input
        onChange={(e) => setComment({ ...comment, comment: e.target.value })}
      />
      <Button
        onClick={handleAddComment}
        value={text}
        onChange={(e) => setText(e.target.value)}
      >
        {loading ? <>Loading</> : <>Post</>}
      </Button>
    </CommentWrapper>
  );
};

const CommentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;
const AvatarDefault = styled.div`
  width: 30px;
  height: 30px;
  background: #347193;
  border-radius: 50%;
`;
const Input = styled.input`
  border: 1.5px solid #347193;
  font-family: "roc-grotesk";
  font-weight: 400;
  font-size: 18px;
  height: 24px;
  text-align: left;
  width: 810px;
  background: none;
  outline: none;
  color: #347193;
  border-radius: 30px;
  padding-left: 12px;
`;
const Button = styled.button`
  border: 1.5px solid #347193;
  background: #347193;
  cursor: pointer;
  font-weight: 400;
  color: #f8f7f7;
  border-radius: 30px;
  width: 100px;
  height: 35px;
`;
const AvatarImg = styled.img`
  width: 30px;
  height: 30px;
  background: #347193;
  border-radius: 50%;
`;
export default AddComment;
