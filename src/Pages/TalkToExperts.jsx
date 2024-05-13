import React from "react";
import BaseLayout from "../Layout/BaseLayout";
import { Card } from "../UI/Card";
import { FileUp } from "lucide-react";
import { Button } from "../UI/Button";
import { Icons } from "../UI/Icons";
import { loadDocs } from "../api-service/docs-service";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const TalkToExperts = () => {
  const file = React.useRef();
  const [trainingFile, setTrainingFile] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const [isUploaded, setIsUploaded] = React.useState(false);
  const fileUploader = (e) => {
    setTrainingFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };
  const callToExpert = async () => {
    if (isUploaded) {
      setIsUploaded(false);
      navigate("/expertChat");
      return;
    }
    setIsLoading(true);
    try {
      console.log(trainingFile);
      let form = new FormData();
      form.append("file", trainingFile);
      console.log(form.get("file"));
      const res = await loadDocs(form);
      console.log(res);
    } catch (e) {
      console.log(e);
      toast.error("Unable to create chat session");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <BaseLayout>
      <div className="flex flex-col h-full w-full justify-center items-center gap-5">
        <h1 className="text-center font-bold text-[30px]">
          Upload and Get Your Doubt Clear For Any Topic
        </h1>
        <Card
          className="w-[50%] cursor-pointer h-[300px] flex flex-col justify-center items-center gap-4"
          onClick={() => file.current.click()}
        >
          <input
            type="file"
            ref={file}
            accept=".pdf, .txt"
            hidden
            onChange={(e) => {
              fileUploader(e);
            }}
          />
          <FileUp size={30} />
          <h1 className="font-medium text-black xl:text-xl sm:text-lg">
            {!trainingFile ? "Upload your File Here" : trainingFile.name}
          </h1>
          <p className="font-normal text-center text-[14px]">
            <span className="font-medium text-black">Browse Files</span> from
            your Computer - Max file 4 MB
          </p>
        </Card>
        <Button
          onClick={callToExpert}
          disabled={isLoading || !trainingFile}
          className="w-[50%]"
        >
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading
            ? "getting Ready"
            : !isUploaded
            ? "Upload the doc"
            : "Procced to chat"}
        </Button>
        <Button
          onClick={callToExpert}
          disabled={!isUploaded}
          className="w-[50%]"
        >
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Download the anylysis of the Doc
        </Button>
      </div>
    </BaseLayout>
  );
};

export default TalkToExperts;
