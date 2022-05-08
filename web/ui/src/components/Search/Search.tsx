import Name from '@components/Name';
import {
  MyFollowingsDocument,
  useCreateFriendshipMutation,
  User,
  useSearchUserQuery,
} from '@graphql.d';
import { Combobox } from '@headlessui/react';
import useDebounce from '@lib/useDebounce';
import classNames from 'classnames';
import { useState } from 'react';

export const Search = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [query, setQuery] = useDebounce('', 200);

  const [createFriendship] = useCreateFriendshipMutation();
  const { data } = useSearchUserQuery({
    variables: {
      query: query,
    },
  });
  const { searchUser: users = [] } = data || {};

  return (
    <div className="mb-2">
      <div className="relative flex focus-within:border-indigo-500 border-2 border-transparent transition-all flex-row items-center bg-slate-200 dark:bg-slate-900 p-2 rounded">
        <Combobox
          value={selectedUser}
          nullable
          onChange={(user) => {
            if (!user) return;
            setSelectedUser(user);
            createFriendship({
              variables: { userID: user?.id },
              refetchQueries: [MyFollowingsDocument],
            });
          }}
        >
          {({ open }) => (
            <>
              <Combobox.Input
                onChange={(e) => {
                  setQuery(e.currentTarget.value);
                }}
                onFocus={() => {}}
                type="text"
                className="bg-transparent flex-1 focus:outline-none peer placeholder:text-slate-400 dark:placeholder:text-slate-600"
                placeholder="Add a friend"
                maxLength={10}
              />
              <div
                className={classNames(
                  open ? 'visible' : 'invisible',
                  'contents'
                )}
              >
                <Combobox.Options
                  static
                  className="absolute top-[100%] left-0 z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-slate-900 py-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                  {users.length === 0 && query !== '' ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                      Nothing found.
                    </div>
                  ) : (
                    users.map((user) => (
                      <Combobox.Option
                        key={user.id}
                        className={({ active }) =>
                          `relative select-none py-2 px-4 cursor-pointer group ${
                            active
                              ? 'bg-indigo-600 text-white'
                              : 'text-slate-200'
                          }`
                        }
                        value={user}
                      >
                        <span className={`flex truncate font-normal`}>
                          <span className="text-slate-700 dark:text-slate-300 font-bold flex-1">
                            {user.duoLogin}
                          </span>
                          <Name
                            className="text-slate-500 group-hover:text-slate-200"
                            user={user}
                          />
                        </span>
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </div>
            </>
          )}
        </Combobox>
        <i className="fa-light fa-user-plus px-2 cursor-pointer transition-all fixed right-5 opacity-100 peer-focus:opacity-0 peer-focus:scale-125 peer-focus:text-indigo-500" />
        <i className="fa-regular fa-arrow-turn-down-left px-[0.6rem] pt-[0.1rem] cursor-pointer transition-all fixed right-5 opacity-0 peer-focus:opacity-100 peer-focus:scale-125 peer-focus:text-indigo-500" />
      </div>
    </div>
  );
};