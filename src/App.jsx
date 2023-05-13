import React, { useState, useEffect } from 'react';
import './App.css'
import * as replit from '@replit/extensions';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);
  const [rootFiles, setRootFiles] = useState([]);

  const replitHandshake = async () => {
    try {
      await replit.init({ permissions: [] });
      setIsConnected(true);
    } catch (error) {
      setError(error);
    }
  }

  const createTestDir = async () => {
    try {
      await replit.fs.createDir('test');
    } catch (error) {
      setError(error);
    }
  }

  const readRootDir = async () => {
    try {
      const { children } = await replit.fs.readDir('.');
      return children;
    } catch (error) {
      setError(error);
    }
  }

  const createTestFile = async () => {
    try {
      await replit.fs.writeFile('test-file.txt', 'example content');
    } catch (error) {
      setError(error);
    }
  }

  useEffect(() => {
    replitHandshake();
  }, []);

  return (
    <main>
      <div>
        <div>
          <div className="heading">React Replit Extension Starter</div>
          {error ? (
            <>
              <div className="error">Error: {error.message ?? error}</div>
              {error.message === "timeout" && (
                <div>Note: Make sure to open this URL as an Extension, not a Webview</div>
              )}
            </>
          ) : (
            <div>{isConnected ?
              <>
                <button className="command-button" onClick={async () =>
                  await createTestDir()}>mkdir test</button>
                <button className="command-button" onClick={async () =>
                  await createTestFile()}>touch ./test-file.txt</button>
                <button className="command-button" onClick={async () => {
                  setRootFiles(await readRootDir())
                }}>ls -a</button>
                <ul>
                  {rootFiles && rootFiles.map((file, index) => (
                    <li key={index}>{file.filename}</li>
                  ))}
                </ul>
              </> : 'Connecting...'}</div>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;