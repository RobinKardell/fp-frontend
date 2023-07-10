import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import * as React from 'react'
import { HiChevronRight } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';

function NavBreadcrumb(props) {
  const navigate = useNavigate();
  
  const routes = [
    { path: '/', breadcrumb: "Översikt" },
    { path: '/schedule', breadcrumb: 'Mitt schema' },
    { path: '/scheduler', breadcrumb: 'Schemaöversikt' },
    { path: '/orders', breadcrumb: 'Arbetsordrar' },
    { path: '/orders/new', breadcrumb: 'Ny Arbetsorder' },
    { path: '/orders/:id', breadcrumb: 'Arbetsorder' },
    { path: '/customers', breadcrumb: 'Kunder' },
    { path: '/customers/:id', breadcrumb: 'Kund' },
    { path: '/employees', breadcrumb: "Anställda" },
    { path: '/employees/:id', breadcrumb: "Anställd" },
    { path: '/teams', breadcrumb: "Teams"},
    { path: '/teams/:id', breadcrumb: "Team"},
    { path: '/timereports', breadcrumb: "Tidrapportering"},
  ];

  const breadcrumbs = useBreadcrumbs(routes);

  return (
    <Breadcrumb
      fontSize="sm"
      {...props}
      separator={<Box as={HiChevronRight} color="gray.400" fontSize="md" top="2px" pos="relative" />}
    >
      {breadcrumbs.map(({ match, breadcrumb }) => (
        <BreadcrumbItem key={Math.random()} color="inherit">
          <BreadcrumbLink onClick={() => navigate(match)}>{breadcrumb}</BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  )
}

export default NavBreadcrumb
