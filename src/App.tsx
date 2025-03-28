import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import {
  Authenticator,
  Flex,
  Button,
  Loader,
  Text,
  View,
  TextAreaField,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import React from "react";
import { uploadData } from "aws-amplify/storage";
import { StorageManager, StorageImage } from "@aws-amplify/ui-react-storage";
import { useAIGeneration } from "./client";

// const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const [description, setDescription] = React.useState("");
  const [file, setFile] = React.useState<File>(
    new File([""], "sample.txt", { type: "text/plain" })
  );
  const [{ data, isLoading }, generateRecipe] = useAIGeneration("generateRecipe");
  const handleClick = async () => {
    generateRecipe({ description });
  };
  const handleChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  // function sayHello() {
  //   client.queries.sayHello({
  //     name: "Amplify",
  //   });
  // }
  // const fetchTodos = async () => {
  //   const { data: items, errors } = await client.models.Todo.list();
  //   alert(items.length + "개의 데이터를 가져왔습니다.");
  // };

  // useEffect(() => {
  //   client.models.Todo.observeQuery().subscribe({
  //     next: (data) => setTodos([...data.items]),
  //   });
  // }, []);

  // function createTodo() {
  //   client.models.Todo.create({ content: window.prompt("Todo content") });
  // }

  // function deleteTodo(id: string) {
  //   client.models.Todo.delete({ id });
  // }

  return (
    <>
      {/* <Authenticator>
        {({ signOut, user }) => (
          <main>
            <h1> {user?.signInDetails?.loginId}'s todos</h1>
            <button onClick={createTodo}>+ new</button>
            <ul>
              {todos.map((todo) => (
                <li onClick={() => deleteTodo(todo.id)} key={todo.id}>
                  {todo.content}
                </li>
              ))}
            </ul>
            <div>
              🥳 App successfully hosted. Try creating a new todo.
              <br />
              <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
                Review next step of this tutorial.
              </a>
            </div>
            <div>
              <input type="file" onChange={handleChange} />
              <button
                onClick={() =>
                  uploadData({
                    path: `picture-submissions/${file.name}`,
                    data: file,
                  })
                }
              >
                Upload
              </button>
              <StorageManager
                acceptedFileTypes={["image/*"]}
                path="picture-submissions/"
                maxFileCount={1}
                isResumable
              />
              <StorageImage alt="data" path="picture-submissions/IMG_8504.jpeg" />
            </div>

            <div>
              <button type="button" onClick={sayHello}>
                sayHello Function
              </button>
              <button onClick={fetchTodos}>Fetch Data</button>
              <button onClick={signOut}>Sign out</button>
            </div>
          </main>
        )}
        
      </Authenticator> */}
      <Authenticator>
        <Flex direction="column">
          <Flex direction="row">
            <TextAreaField
              autoResize
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              label="Description"
            />
            <Button onClick={handleClick}>Generate recipe</Button>
          </Flex>
          {isLoading ? (
            <Loader variation="linear" />
          ) : (
            <>
              <Text fontWeight="bold">{data?.name}</Text>
              <View as="ul">
                {data?.ingredients?.map((ingredient) => (
                  <View as="li" key={ingredient}>
                    {ingredient}
                  </View>
                ))}
              </View>
              <Text>{data?.instructions}</Text>
            </>
          )}
        </Flex>
      </Authenticator>
    </>
  );
}

export default App;
