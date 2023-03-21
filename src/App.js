import "./App.css";
import { useEffect, useState } from "react";
import { createUser, getToken, getUser } from "./LoginService";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentId");
    getUser(currentUser).then((u) => {
      setUser(u.data);
    });
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem("currentId", user.userId);
  }, [user]);

  async function handleDfsRedirect() {
    try {
      const token = (await getToken(user._id)).data;
      console.log({ token });
      localStorage.setItem("token", token.token);
      window.open(
        "https://phantasia-frontend-staging.vercel.app/login?redirect=/home",
        "_blank"
      );
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    async function handleMessage(e) {
      if (e.origin !== "http://localhost:3000/login") {
        return;
      }
      const token = localStorage.getItem("token");
      const parent = window.parent;
      console.log("Posting Message", { key: "token", value: token });
      parent.postMessage(
        { key: "token", value: token },
        // "https://phantasia-frontend-staging.vercel.app"
        "http://localhost:3000/login"
      );
    }

    window.addEventListener("message", handleMessage);
  }, []);

  return (
    <div className={"w-screen min-h-screen flex pt-20 p-12"}>
      <div className={"w-full overflow-visible grid grid-cols-2 gap-12"}>
        <div className={"flex flex-col items-center"}>
          {!user ? (
            <>
              <div
                className={"w-24 h-24 rounded-full bg-zinc-200 animate-pulse"}
              />
              <div
                className={"w-56 h-8 rounded-lg bg-zinc-200 animate-pulse"}
              />
              <div
                className={"w-56 h-8 rounded-lg bg-zinc-200 animate-pulse"}
              />
            </>
          ) : (
            <>
              <img
                src={user.picture}
                className={"w-24 h-24 rounded-full object-cover"}
                alt={"profile"}
              />
              <span className={"text-md text-zinc-900 font-semibold"}>
                👋 Hello, {user.username}
              </span>
              <span className={"text-3xl text-zinc-700 font-bold"}>
                💰 ${user.balance.toFixed(2)}
              </span>
            </>
          )}
          <div className={"flex py-10"}>
            <button
              onClick={handleDfsRedirect}
              className={
                "cursor-pointer transition hover:bg-red-800 py-7 px-9 rounded-xl flex items-center justify-center bg-red-600 text-zinc-50 font-bold text-6xl"
              }
            >
              PLAY DFS!!!!
            </button>
          </div>
        </div>

        <div className={"flex flex-col overflow-visible space-y-10"}>
          <div
            className={"w-full  shadow-2xl shadow-zinc-800/20 rounded-3xl p-8"}
          >
            <NewUserForm setUser={setUser} />
          </div>

          <div
            className={"w-full rounded-2xl p-8 shadow-2xl shadow-zinc-800/20"}
          >
            <SignInForm setUser={setUser} />
          </div>
        </div>
      </div>
    </div>
  );
}

function NewUserForm({ setUser }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    picture: "",
  });
  const [loading, setLoading] = useState(false);

  function submit() {
    setLoading(true);
    createUser(form)
      .then((res) => {
        console.log(res);
        if (res.data) setUser(res.data);
        setLoading(false);
        setForm({
          username: "",
          email: "",
          picture: "",
        });
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }

  const inputs = [
    {
      value: form.username,
      setValue: (e) => setForm({ ...form, username: e.target.value }),
      label: "Username",
    },
    {
      value: form.email,
      setValue: (e) => setForm({ ...form, email: e.target.value }),
      label: "Email",
    },
    {
      value: form.picture,
      setValue: (e) => setForm({ ...form, picture: e.target.value }),
      label: "Picture",
    },
  ];

  return (
    <div className={"flex flex-col space-y-5"}>
      <span className={"font-2xl font-semibold text-zinc-800"}>
        Create new user
      </span>
      {inputs.map((input) => (
        <Input {...input} />
      ))}
      <button
        onClick={submit}
        className={
          "cursor-pointer transition hover:bg-red-800 py-4 px-7 rounded-full flex items-center justify-center bg-red-600 text-zinc-50 font-semibold text-lg"
        }
      >
        {loading ? "Loading..." : "Submit New User"}
      </button>
    </div>
  );
}

function SignInForm({ setUser }) {
  const [betOpenlyId, setBetOpenlyId] = useState("");
  const [loading, setLoading] = useState(false);

  function submit() {
    setLoading(true);
    getUser(betOpenlyId)
      .then((res) => {
        console.log(res);
        if (res.data) setUser(res.data);
        setLoading(false);
        setBetOpenlyId("");
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }

  return (
    <div className={"flex flex-col space-y-5"}>
      <span className={"font-2xl font-semibold text-zinc-800"}>
        Returning user
      </span>

      <Input
        label={"BetOpenly Id"}
        setValue={(e) => setBetOpenlyId(e.target.value)}
        value={betOpenlyId}
      />

      <button
        onClick={submit}
        className={
          "cursor-pointer transition hover:bg-red-800 py-4 px-7 rounded-full flex items-center justify-center bg-red-600 text-zinc-50 font-semibold text-lg"
        }
      >
        {loading ? "Loading..." : "Sign In User"}
      </button>
    </div>
  );
}

function Input({ value, setValue, label }) {
  return (
    <div className={"flex flex-col space-y-2 flex-1"}>
      <span className={"text-sm font-medium text-zinc-800"}>{label}</span>
      <input
        placeholder={label}
        value={value}
        onChange={setValue}
        className={
          "rounded-xl focus:ring-2 focus:ring-red-600 transition p-4 hover:bg-zinc-100 focus:bg-zinc-100 bg-zinc-50 ring-1 ring-black/10"
        }
      />
    </div>
  );
}

export default App;
