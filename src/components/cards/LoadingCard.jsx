import { Card, Skeleton } from "antd";
import React from "react";

function LoadingCard({ count }) {
  const listLoadingElement = [...Array(count).keys()];
  return (
    <div className="row pb-5">
      {listLoadingElement.map((each) => (
          <Card className='col-md-4'>
              <Skeleton key={each} active/>
          </Card>
      ))}
    </div>
  );
}

export default LoadingCard;
