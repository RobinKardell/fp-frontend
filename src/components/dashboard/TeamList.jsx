import { Avatar } from '@chakra-ui/react'
import React from 'react'
import { data } from "./_data"
import { SidebarLink } from './SidebarLink'
import { useState } from 'react'
import { useEffect } from 'react'
import { NavSectionTitle } from './NavSectionTitle'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

function TeamList() {
  const axiosPrivate = useAxiosPrivate();
  const [myTeam, setMyTeam] = useState([])

  const getUserTeam = async () => {
    try {
      const getUserTeamResponse = await axiosPrivate.get("/Me/Team")
      if (getUserTeamResponse.data.success) {
        setMyTeam(getUserTeamResponse.data.data)
      }
    } catch {
      setMyTeam([])
    }
  }

  useEffect(() => {
    getUserTeam()
  }, [])

  return (
    <>
      {myTeam.length < 1 && (
        <NavSectionTitle>Team Saknas</NavSectionTitle>
      )}
      <NavSectionTitle>{myTeam.name}</NavSectionTitle>
      {myTeam?.users?.map((employee) => (
        <SidebarLink
          key={employee.id}
          avatar={<Avatar size="xs" name={`${employee.firstName} ${employee.lastName}`} src={employee.avatarUrl} />}
        >
          {employee.firstName} {employee.lastName}
        </SidebarLink>
      ))}
    </>
  )
}

export default TeamList