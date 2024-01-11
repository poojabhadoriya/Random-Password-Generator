import React, { useCallback, useEffect, useRef, useState } from "react";

const PassGen = () => {
  const [lenght, setLenght] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  //useref hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += " !#$%&'()*+,-./:;<=>?@[]^_`{|}~";

    for (let i = 1; i <= lenght; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [lenght, numberAllowed, charAllowed]);

  useEffect(() => {
    // console.log("Hello there");
    passwordGenerator();
  }, [lenght, numberAllowed, charAllowed, passwordGenerator]);

  const copyPasswordToClipborad = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0, 3);

    // window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ height: "200px" }}
    >
      <div className="w-50 bg-success py-3 rounded">
        <h2 className="text-white">Hello</h2>

        <div className=" flex mb-4 overflow-hidden">
          <input
            type="text"
            className="w-50 rounded no-outline py-1 px-3"
            style={{outline: "none"}}
            placeholder="password"
            value={password}
            readOnly
            ref={passwordRef}
          />
          <button
            className="btn btn-primary"
            onClick={copyPasswordToClipborad()}
          >
            copy
          </button>
        </div>

        {/*  */}
        <div className="d-flex justify-content-center flex-row gap-2">
          <div>
            <input
              type="range"
              value={lenght}
              min={8}
              max={100}
              onChange={(e) => setLenght(e.target.value)}
            />
            <label style={{marginLeft:"5px"}}>Lenght :{lenght}</label>
          </div>
          {/*  */}
          <div>
            <input
              type="checkbox"
              onChange={() => setNumberAllowed(!numberAllowed)}
            />
            <label>Number</label>
          </div>
          {/*  */}
          <div>
            <input
              type="checkbox"
              onChange={() => setCharAllowed(!charAllowed)}
            />
            <label>Character</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassGen;
