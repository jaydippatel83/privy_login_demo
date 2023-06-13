import React from 'react';
import { usePrivy } from '@privy-io/react-auth';

const PrivyLogin = () => {
    const { ready, authenticated, user, login, logout } = usePrivy();

    if (!ready) {
        return null;
      }

    return (
        <div>
            
            {ready && authenticated ? (
          <div>
            <textarea
              readOnly
              value={JSON.stringify(user, null, 2)}
              style={{ width: "600px", height: "250px", borderRadius: "6px" }}
            />
            <br />
            <button onClick={logout} style={{ marginTop: "20px", padding: "12px", backgroundColor: "#069478", color: "#FFF", border: "none", borderRadius: "6px" }}>
              Log Out
            </button>
          </div>
        ) : (
          <button onClick={login} style={{padding: "12px", backgroundColor: "#069478", color: "#FFF", border: "none", borderRadius: "6px", cursor:'pointer' }}>Log In</button>
        )}
        </div>
    );
};

export default PrivyLogin;