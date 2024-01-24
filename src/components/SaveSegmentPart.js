import React, { useState } from "react";
import { Button } from "react-bootstrap";
import SegmentModalPart from "./SegmentModalPart";

function SaveSegmentPart() {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
  };
  return (
    <div style={{ position: "relative" }}>
      <div className="topnav_style">
        <p className="text_topnav">View Audience</p>
      </div>
      <div className="p-20">
        <Button
          variant="outline-secondary"
          onClick={handleShow}
          className="savesegment_btn"
        >
          Save Segment
        </Button>
      </div>

      {show && <SegmentModalPart show={show} close={() => setShow(false)} />}
    </div>
  );
}

export default SaveSegmentPart;
