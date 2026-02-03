 import React from "react";
type PageProps = {
  params: {
    id: string;
  };
};

export default function Page({ params }: PageProps) {
  const { id } = params;
  console.log("from params",id)

  return (
    <div>
      <h1>Category ID: {id}</h1>
    </div>
  );
}
