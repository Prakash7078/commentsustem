"use client";
import { useState, useEffect, useContext } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { FcComments } from 'react-icons/fc';
import { BsFillSendFill } from 'react-icons/bs';
import { UserContext } from '../page';

interface Post {
  _id: string;
  profile: string;
  name: string;
  desc: string;
  post: string;
  tags: string[];
}

interface Comment {
  _id: string;
  desc: string;
  msgs: string[];
  personId: string;
}

interface Data {
  desc: string;
  itemid: string;
  msgs: string[];
}

interface MsgData {
  _id: string;
  desc: string;
  itemid: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [visible, setVisible] = useState<string | null>(null);
  const [smallvisible, setSmallvisible] = useState<string | null>(null);
  const [data, setData] = useState<Data>({ desc: '', itemid: '', msgs: [] });
  const [msgdata, setMsgdata] = useState<MsgData>({ _id: '', desc: '', itemid: '' });
  const [comments, setComments] = useState<Comment[]>([]);
  const user = useContext(UserContext);
  console.log("user",user);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsResponse = await fetch('/api/', {
          method: 'GET',
        });
        const postsData = await postsResponse.json();
        setPosts(postsData.posts);

        const commentsResponse = await fetch('/api/data/', {
          method: 'GET',
        });
        const commentsData = await commentsResponse.json();
        setComments(commentsData.res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [data || comments]);

  const handleComment = (id: string) => {
    setVisible(id);
  };

  const handleSend = async () => {
    try {
      await fetch('/api/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(msgdata),
      });
    } catch (err) {
      console.log(err);
    }
    setMsgdata({ ...msgdata, desc: '' });
    setSmallvisible(null);
  };

  const handleMsg = async () => {
    try {
      await fetch('/api/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    } catch (err) {
      console.log(err);
    }
    setData({ ...data, desc: '', itemid: '' });
    setVisible(null);
  };

  return (
    <div className="w-full">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5 grid-cols-1 md:p-10">
        {posts.map((item) => (
          <div key={item._id} className="shadow-2xl shadow-green-300">
            <div className="w-full p-2  shadow-inner flex flex-col gap-4 p-2">
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <img src={item.profile} alt="profile" className="w-10 h-10 rounded-full" />
                  <h1 className="font-bold">{item.name}</h1>
                </div>
                <h1>{item.desc}</h1>
              </div>

              <img src={item.post} alt="post" className="w-96 md:h-96 h-64 object-cover" />
              <div className="flex gap-1 ">
                {item.tags.map((tag) => (
                  <div key={tag} className="font-bold">
                    <h1>{tag}</h1>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <AiOutlineHeart size={25} />
                <FcComments
                  size={25}
                  className="cursor-pointer"
                  onClick={() => handleComment(item._id)}
                />
              </div>
              {visible === item._id && (
                <div>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="enter comment"
                      value={data.desc}
                      onChange={(e) => setData({ ...data, desc: e.target.value, itemid: item._id })}
                      className="border-2  w-full p-1"
                    />
                    <button
                      className="bg-green-300 px-2 text-white"
                      onClick={() => handleMsg()}
                    >
                      Send
                    </button>
                  </div>
                </div>
              )}
              {comments
                .filter((it) => it.personId === item._id)
                .map((it) => (
                  <div key={it._id} className="flex flex-col gap-1">
                    <div className="flex items-center gap-4">
                      <h1>{it.desc}</h1>
                      <FcComments onClick={() => setSmallvisible(it._id)} />
                      {smallvisible === it._id && (
                        <div className="flex items-center">
                          <input
                            type="text"
                            placeholder="comment..."
                            value={msgdata.desc}
                            onChange={(e) =>
                              setMsgdata({ ...msgdata, _id: it._id, desc: e.target.value, itemid: item._id })
                            }
                          />
                          <button onClick={handleSend}>
                            <BsFillSendFill />
                          </button>
                        </div>
                      )}
                    </div>
                    {it.msgs.length > 0 &&
                      it.msgs.map((msg, index) => (
                        <div key={index} className="ml-5 flex items-center gap-2">
                          <h1>{msg}</h1>
                          <AiOutlineHeart size={15} />
                        </div>
                      ))}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
