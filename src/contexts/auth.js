import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const userToken = localStorage.getItem("user_token");
    if (userToken) {
      // Supondo que 'usersStorage' deveria ser um array de usuários,
      // você deve substituir a string abaixo por um array apropriado
      // ou obtê-lo de alguma outra forma, como uma chamada de API.
      const usersStorage = [
        { user: "SuporteReact", password: "Suporte@3200" } // Exemplo de usuário
      ];

      const hasUser = usersStorage.filter(
        (storedUser) => storedUser.user === JSON.parse(userToken).user
      );

      if (hasUser.length) setUser(hasUser[0]);
    }
  }, []);

  const signin = (email, password) => {
    const usersStorage = [
      { email: "SuporteReact", password: "Suporte@3200" } // Exemplo de usuário
    ];

    const hasUser = usersStorage.filter((storedUser) => storedUser.email === email);

    if (hasUser?.length) {
      if (hasUser[0].email === email && hasUser[0].password === password) {
        const token = Math.random().toString(36).substring(2);
        localStorage.setItem("user_token", JSON.stringify({ email, token }));
        setUser({ email, password });
        return;
      } else {
        return "Usuário ou senha incorretos";
      }
    } else {
      return "Usuário não cadastrado";
    }
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user_token");
  };

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, signin, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
