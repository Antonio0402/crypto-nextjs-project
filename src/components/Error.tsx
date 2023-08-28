import { Button, Result } from "antd";
import { useRouter } from "next/router";
import { ReactNode } from "react";

const Error = ({
  type,
  url,
  children,
}: {
  type: "reload" | "push";
  url: string;
  children: ReactNode;
}) => {
  const router = useRouter();
  return (
    <div className="grid place-items-center w-full">
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={
          <Button
            onClick={() => {
              router[type](url);
            }}
            type="primary"
            className="text-white bg-black"
          >
            {children}
          </Button>
        }
      />
    </div>
  );
};

export default Error;
