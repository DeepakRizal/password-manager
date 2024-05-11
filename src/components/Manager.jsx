import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Manager() {
  const [form, setForm] = useState({
    site: "",
    username: "",
    password: "",
  });
  const [passwordsArray, setPasswordsArray] = useState([]);
  const ref = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    const passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordsArray(JSON.parse(passwords));
    }
  }, []);

  const showPassword = () => {
    if (ref.current.src.includes("/eye-crossed.png")) {
      ref.current.src = "/eye.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "/eye-crossed.png";
      passwordRef.current.type = "text";
    }
  };

  const savePassword = () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      setPasswordsArray([...passwordsArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordsArray, { ...form, id: uuidv4() }])
      );
      setForm({
        site: "",
        username: "",
        password: "",
      });
    }
  };

  const deletePassword = (id) => {
    setPasswordsArray(passwordsArray.filter((item) => item.id !== id));
    localStorage.setItem(
      "passwords",
      JSON.stringify(passwordsArray.filter((item) => item.id !== id))
    );
  };

  const editPassword = (id) => {
    console.log("editing password with id", id);
    setForm(passwordsArray.filter((i) => i.id === id)[0]);
    setPasswordsArray(passwordsArray.filter((item) => item.id !== id));
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
  };

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className=" p-2  md:mycontainer min-h-[84.4vh]">
        <h1 className="text-4xl text font-bold text-center">
          <span className="text-green-500"> &lt;</span>
          Pass
          <span className="text-green-500">OP/ &gt;</span>
        </h1>
        <p className="text-green-800 text-lg text-center">
          Your own Password Manager
        </p>
        <div className=" flex flex-col p-4 text-black gap-5 items-center">
          <input
            placeholder="Enter website url"
            className=" rounded-full w-full border px-4 py-1 border-green-500"
            type="text"
            name="site"
            value={form.site}
            onChange={handleChange}
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8 ">
            <input
              placeholder="Enter Username"
              className=" rounded-full w-full border px-4 py-1 border-green-500"
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              id="username"
            />
            <div className="relative">
              <input
                placeholder="Enter Password"
                className=" rounded-full w-full border px-4 py-1 border-green-500"
                name="password"
                type="password"
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                id="password"
              />
              <span
                className="absolute right-0 top-0.5 cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  width={33}
                  className="p-2"
                  src="/eye.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex gap-2 justify-center items-center bg-green-500 hover:bg-green-600 rounded-full px-8 py-2 w-fit border border-green-900 "
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Add Password
          </button>
        </div>

        <div className="passwords">
          <h2 className="font-bold text-xl py-4">Your Passwords</h2>
          {passwordsArray.length === 0 && <div>No passwords to show</div>}
          {passwordsArray.length !== 0 && (
            <table className="table-auto w-full rounded-md mb-10">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordsArray.map((item) => (
                  <tr key={item.id}>
                    <td className="  py-2 border border-white text-center w-32">
                      <a href={item.site} target="_blank">
                        {item.site}
                      </a>
                      <button
                        className=" icon-copy pl-2"
                        onClick={() => copyText(item.site)}
                      >
                        <img
                          className="w-4"
                          src="/copy.png"
                          alt="copy to clipboard image"
                        />
                      </button>
                    </td>
                    <td className=" py-2 border border-white text-center w-32">
                      {item.username}
                      <button
                        className=" icon-copy pl-2"
                        onClick={() => copyText(item.username)}
                      >
                        <img
                          className="w-4"
                          src="/copy.png"
                          alt="copy to clipboard image"
                        />
                      </button>
                    </td>
                    <td className=" py-2 border border-white text-center w-32">
                      {item.password}
                      <button
                        className=" icon-copy pl-2"
                        onClick={() => copyText(item.password)}
                      >
                        <img
                          className="w-4"
                          src="/copy.png"
                          alt="copy to clipboard image"
                        />
                      </button>
                    </td>
                    <td className=" justify-center py-2 border border-white text-center w-32">
                      <div className="flex w-full items-center justify-center gap-2">
                        <span
                          className="cursor-pointer"
                          onClick={() => editPassword(item.id)}
                        >
                          <img
                            className="w-5"
                            src="/file-edit.png"
                            alt="icon to edit "
                          />
                        </span>
                        <span
                          className="cursor-pointer"
                          onClick={() => deletePassword(item.id)}
                        >
                          <img
                            className="w-5"
                            src="/image.png"
                            alt="delete image"
                          />
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
