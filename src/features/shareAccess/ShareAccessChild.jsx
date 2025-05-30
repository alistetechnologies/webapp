import { useEffect, useState } from "react";
import { useAuth } from "../auth/api/authStore";
import useHouseStore from "../dashboard/houseStore";
import {
  fetchHouseUserDetails,
  removeUserFromHouse,
} from "./api/shareAccessApi";

import { Spinner } from "@/components/ui/spinner";
import { UserCard } from "./UserCard";
import AddUser from "./AddUser";
import { Button } from "@/components/ui/button";
import { ConfirmationDialog } from "@/components/ui/common/ConfirmationDialog";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function ShareAccessChild() {
  const house = useHouseStore((state) => state.house);
  const authUser = useAuth((state) => state.auth);
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [error, setError] = useState("");

  const [userLookup, setUserLookup] = useState({});
  const [leaveHouseModal, setLeaveHouseModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetchHouseUserDetails(house._id, authUser.number);

      if (!response.success) {
        toast.error(response.message);
        setError(response.message);
        setUserLookup({});
        return;
      }
      const data = response.data;
      setData(data);
      if (data && data.users) {
        const lookup = data.users.reduce((acc, user) => {
          acc[user.email] = user;
          return acc;
        }, {});

        setUserLookup(lookup);
      }
    } catch (error) {
      // setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-full w-full bg-[#EAEBF0]">
        <Spinner size="lg" />
      </div>
    );

  const { createdBy, users, masters, rest, roomAccess, timed, houseId } = data;

  if (error || Object.keys(userLookup).length === 0)
    return (
      <div className="flex justify-center items-center h-full w-full bg-[#EAEBF0]">
        <Spinner size="lg" />
      </div>
    );

  return (
    <div>
      <div className="flex gap-4 items-center">
        {masters.includes(`+91${authUser.number.replace("+91", "")}`) && (
          <AddUser houseUsers={data} refetch={fetchData} />
        )}

        <ConfirmationDialog
          message={
            "Are you sure you want to leave house? This action cannot be reversed."
          }
          buttonText={"Leave House"}
          onConfirm={() => {
            removeUserFromHouse(houseId, `+91${authUser.number}`);
            fetchData();

            navigate("/");
            0;
          }}
          buttonStyle="bg-red-600"
          buttonVariant="destructive"
        />
      </div>
      <h2 className="text-2xl text-muted-foreground p-2 font-bold">Owner</h2>
      <UserCard
        user={userLookup[createdBy]}
        owner={true}
        houseUsers={data}
        refetch={fetchData}
        createdBy={createdBy}
        masters={masters}
      />
      {masters.includes(`+91${authUser.number.replace("+91", "")}`) && (
        <>
          <h2 className="text-2xl text-muted-foreground p-2 font-bold mt-4">
            Admins
          </h2>
          {masters
            .filter((user) => user !== createdBy)
            .map((userId) => {
              let user = userLookup[userId];

              return (
                <div className="my-2">
                  <UserCard
                    user={user}
                    key={userId}
                    houseUsers={data}
                    refetch={fetchData}
                    createdBy={createdBy}
                    masters={masters}
                  />
                </div>
              );
            })}
          {rest.length > 0 && (
            <div>
              <h2 className="text-2xl text-muted-foreground p-2 font-bold mt-4">
                Users
              </h2>
              {rest.map((userId) => {
                const user = userLookup[userId];

                return (
                  <div className="my-2">
                    <UserCard
                      user={user}
                      key={userId}
                      houseUsers={data}
                      refetch={fetchData}
                      createdBy={createdBy}
                      masters={masters}
                    />
                  </div>
                );
              })}
            </div>
          )}
          {timed.length > 0 && (
            <div>
              <h2 className="text-2xl text-muted-foreground p-2 font-bold mt-4">
                Guest
              </h2>
              {timed.map((userId) => {
                const user = userLookup[userId.email];

                return (
                  <div className="my-2">
                    <UserCard
                      user={{ ...user, ...userId }}
                      key={userId}
                      houseUsers={data}
                      refetch={fetchData}
                      timed={true}
                      createdBy={createdBy}
                      masters={masters}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
