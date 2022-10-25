import { useEffect } from "react";
import { useQuery, useReactiveVar } from "@apollo/client";
import { isLoggedInVar, loginUserOut } from "../apollo";
import { graphql } from "../gql";

export const ME_QUERY = graphql(`
  query me {
    me {
      userName
      avatar
      totalFollowing
      totalFollowers
    }
  }
`);

// Clinet Token 일치 여부 확인
function useUser() {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data, client } = useQuery(ME_QUERY, {
    skip: !hasToken,
  });

  useEffect(() => {
    if (data?.me === null) {
      console.log(
        "There is token on IS but the token did not work on the backend"
      );
      loginUserOut();
    }
  }, [data]);

  return { data, client };
}

export default useUser;
