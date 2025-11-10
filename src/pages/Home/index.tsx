import { useState, useRef } from 'react';
import FruitItem from '../../components/FruitItem';
import './index.scss'
import SectionScroll from '../../components/SectionScroll';

function Home() {

      const defaultFruitsList = [
    {
      id: 1,
      name: 'Apple',
      image: 'https://illustcenter.com/wp-content/uploads/2021/11/rdesign_4083.png'
    },
    {
      id: 2,
      name: 'Banana',
      image: 'https://illustcenter.com/wp-content/uploads/2021/11/rdesign_4377.png'
    },
    {
      id: 3,
      name: 'Cherry',
      image: 'https://illustcenter.com/wp-content/uploads/2021/11/rdesign_4389.png'
    }
  ];

  type Fruit = {
    id: number;
    name: string;
    image?: string;
  }

  const [fruits, setFruits] = useState<Fruit[]>(defaultFruitsList);
  const [keyword, setKeyword] = useState("");

  const [newFruitName, setNewFruitName] = useState("");
  const idRef = useRef<number>(4);

  const addFruits = () => {
    if(!newFruitName.trim()) return;
    const newFruit = {
      id: idRef.current++,
      name: newFruitName.trim()
    };
    setFruits(prev => [...prev, newFruit]);
    setNewFruitName("" );
  }

  return (
    <div>
      <h1>Hello World</h1>
      <div>
        <h2>Fruits List</h2>
        <ul className='fruit-list'>
          {fruits.filter((fruit) => fruit.name.toLowerCase().includes(keyword.toLowerCase())).map(fruit => (
            <FruitItem key={fruit.id} fruit={fruit} />
          ))}
        </ul>
        <input type="text" onChange={(e)=> setKeyword(e.target.value)} />
        <div>{keyword}</div>
        <input type="text" value={newFruitName} onChange={(e) => setNewFruitName(e.target.value)} placeholder="新しいフルーツを追加" />
        <button onClick={addFruits}>追加</button>
      </div>
      <div style={{ height: '100vh', padding: '20px' }}>
        <SectionScroll>
          <p>スクロールします</p>
          <p>スクロールします</p>
          <p>スクロールします</p>
          <p>スクロールします</p>
          <p>スクロールします</p>
          <p>スクロールします</p>
          <p>スクロールします</p>
          <p>スクロールします</p>
        </SectionScroll>
      </div>
      <div style={{ height: '100vh', padding: '20px' }}>
        <SectionScroll animationOptions={{ x: -128, y: 0, opacity: 0, markers: true }}>
          <h2>左から登場するセクション</h2>
          <p>このセクションは左からアニメーションします</p>
        </SectionScroll>
      </div>
      <div style={{ height: '100vh', padding: '20px' }}>
        <SectionScroll animationOptions={{ x: 0, y: 64, opacity: 0, markers: true }}>
          <h2>下から登場するセクション</h2>
          <p>このセクションは下からアニメーションします</p>
        </SectionScroll>
      </div>
    </div>
  )
}

export default Home;