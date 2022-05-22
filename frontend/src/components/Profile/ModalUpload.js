import { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../../Context/UserContext";

const ModalUpload = ({ _id, setOpenUploadModal }) => {
  const { setCurrentUser } = useContext(UserContext);
  const [uploadMsg, setUploadMsg] = useState(false);
  const [profile, setProfile] = useState({
    userId: _id,
    profileImg: "",
  });

  // fetching user
  const fetchUser = () => {
    const user = async () => {
      const response = await fetch(`/user/${_id}`);
      const data = await response.json();
      setCurrentUser(data.data);
    };
    user();
  };

  // uploading to cloundinary
  const handleUpload = async (e) => {
    const picture = e.target.files;
    const file = new FormData();
    file.append("file", picture[0]);
    file.append("upload_preset", "Eechee");
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dohydf1mu/image/upload",
      {
        method: "POST",
        body: file,
      }
    );
    const data = await response.json();
    setProfile({ ...profile, profileImg: data.url });
  };

  //   uploading to mongoDB
  const handleUploadMongo = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    };

    const response = await fetch("/user", requestOptions);
    const data = await response.json();
    if (data.status === 200) {
      setUploadMsg(true);
    }
    return fetchUser();
  };

  return (
    <ModalWrapper>
      <PopUpContent>
        <ExitButton
          onClick={() => {
            setOpenUploadModal(false);
          }}
        >
          x
        </ExitButton>
        <Wrapper>
          <Text>Upload Profile Picture Content Here</Text>
          <WrapperUpload>
            <UploadInput type="file" name="file" onChange={handleUpload} />
            <Button onClick={handleUploadMongo}>Upload</Button>
          </WrapperUpload>
          {uploadMsg && (
            <TextUploaded>Profile picture has been uploaded!</TextUploaded>
          )}
        </Wrapper>
      </PopUpContent>
    </ModalWrapper>
  );
};
const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`;
const PopUpContent = styled.div`
  width: 500px;
  height: 180px;
  background: #f8f7f7;
  border-radius: 40px;
  padding: 50px 50px 0 50px;
  overflow-y: auto;
`;
const Text = styled.p`
  font-size: 20px;
  text-align: center;
`;
const TextUploaded = styled.p`
  font-size: 16px;
  margin-top: 15px;
  text-align: center;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const WrapperUpload = styled.div`
  display: flex;
  margin-top: 40px;
`;
const UploadInput = styled.input`
  padding-left: 80px;
  padding-top: 3px;
  font-size: 18px;
  font-weight: 400;
  color: #347193;
  cursor: pointer;
  font-family: "roc-grotesk";
  background: #f8f7f7;
  border: 1.5px solid #347193;
  border-radius: 30px;
  height: 28px;
  width: 200px;
  ::-webkit-file-upload-button {
    display: none;
  }
  &:hover {
    background: #347193;
    color: #f8f7f7;
    transition: 0.2s;
  }
`;
const ExitButton = styled.button`
  float: right;
  border: 1.5px solid #347193;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  color: #347193;
  cursor: pointer;
  font-weight: 600;
  background: #f8f7f7;
  &:hover {
    background: #347193;
    color: #f8f7f7;
    transition: 0.2s;
  }
`;
const Button = styled.button`
  border: 1.5px solid #347193;
  color: #347193;
  cursor: pointer;
  font-weight: 400;
  background: #f8f7f7;
  border-radius: 30px;
  width: 100px;
  height: 35px;
  margin-left: 30px;
  &:hover {
    background: #347193;
    color: #f8f7f7;
    transition: 0.2s;
  }
`;
export default ModalUpload;
