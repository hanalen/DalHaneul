import React, { useEffect } from 'react';
import { BskyAgent } from '@atproto/api';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '../store/Store';
import { userSlice } from '../store/UserSlice';

function Login() {
  const { agent } = useSelector((state: RootState) => state.userState);
  const navigate = useNavigate();
  const [id, setId] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const [isRender, setIsRender] = React.useState<boolean>(false);

  const RequestLogin = async () => {
    try {
      const result = await agent.login({
        identifier: id,
        password: password,
      });
      console.log(result);
      if (result.success) {
        localStorage.setItem('agent-token', JSON.stringify(result.data));
        console.log('로그인 성공');
        navigate('/home');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const OnChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const OnChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    const agentToken = localStorage.getItem('agent-token');
    if (agentToken) {
      navigate('/home');
    } else {
      setIsRender(true);
    }
  }, []);

  if (!isRender) {
    //깜빡임 방지용 코드
    return <div></div>;
  } else
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h2 className="text-xl text-center">달하늘</h2>
        <h3 className="text-lg text-center">블루스카이용 웹 애플리케이션</h3>
        <div className="mt-4 p-20 border rounded-lg bg-blue-100">
          <div className="p-2">
            <div className="p-2">
              <label className="mr-2 text-neutral-600">아이디</label>
              <br />
              <input
                className="mt-1 h-10 p-2 pl-4 outline-neutral-400 rounded-lg border border-neutral-200"
                onChange={OnChangeId}
                placeholder="example.bsky.social"
              />
            </div>
            <div className="p-2">
              <label className="mr-2 text-neutral-600">비밀번호</label>
              <br />
              <input
                className="mt-1 h-10 p-2 pl-4 outline-neutral-400 rounded-lg border border-neutral-200"
                onChange={OnChangePassword}
                placeholder="************"
                type="password"
              />
            </div>
            <div className="flex justify-center p-2">
              <button
                className="border w-full bg-blue-500 py-1 rounded-lg text-white"
                onClick={RequestLogin}
              >
                로그인
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Login;
