import React from 'react';
import { Box, Button, Flex, Icon, SimpleGrid, Text } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import { NextSeo } from 'next-seo';
import LineHeading from '../Components/LineHeading';
import RepoCard from '../Components/RepoCard';
import PinnedProjects from '../Components/PinnedProjects';
import { pinnedRepos, pinnedRepoType } from '../../data/pinnedRepos';
import { repoType } from './api/github';

function Projects({
  stars,
  repos,
  followers,
}: {
  stars: number;
  repos: repoType[];
  followers: number;
}) {
  return (
    <>
      <NextSeo title="Projects" />
      <Box
        width="full"
        px={3}
        minH="100vh"
        height="full"
        mx="auto"
        maxW="6xl"
        py="28"
      >
        <Flex
          direction="column"
          alignItems="center"
          width="full"
          px={3}
          height="full"
          mx="auto"
        >
          <LineHeading
            fontSize={{ base: `5xl`, md: `6xl` }}
            mx="auto"
            textAlign="center"
          >
            My projects
          </LineHeading>
          <Text mt={3}>A quick collection of my projects.</Text>
          <Flex
            direction="column"
            my={16}
            width="full"
            height="full"
            maxWidth="4xl"
            spacingX={10}
            spacingY={8}
          >
            {pinnedRepos
              .sort(
                (a: pinnedRepoType, b: pinnedRepoType) =>
                  new Date(
                    repos.filter(
                      (x: repoType) => x.name === a.id,
                    )[0].created_at,
                  ).getTime() -
                  new Date(
                    repos.filter(
                      (y: repoType) => y.name === b.id,
                    )[0].created_at,
                  ).getTime(),
              )
              .reverse()
              .map((data: pinnedRepoType) => (
                <PinnedProjects
                  repo={repos.filter((x: repoType) => x.name === data.id)[0]}
                  projectData={data}
                />
              ))}
          </Flex>
          <LineHeading fontSize={{ base: `5xl`, lg: `5xl` }} textAlign="center">
            Repositories
          </LineHeading>
          <Text mt={3}>
            A list of all of the public repositories on my GitHub.
          </Text>
          <Button
            as="a"
            href="https://github.com/mah51"
            variant="ghost"
            colorScheme="brand"
            size="lg"
            mt={5}
            leftIcon={<FaGithub />}
          >
            View My Profile
          </Button>
          {/* Flex ends before SimpleGrid. See Issue #1 https://github.com/mah51/personal-web/issues/1 */}
        </Flex>

        <SimpleGrid
          mt={10}
          maxWidth="full"
          columns={{ base: 1, md: 2 }}
          width="full"
          height="full"
          maxH="full"
          gridAutoRows="1fr"
          spacingX={10}
          spacingY={8}
          isTruncated
          overflow="visible"
        >
          {repos
            .sort(
              (a: any, b: any) =>
                new Date(a.pushed_at).getTime() -
                new Date(b.pushed_at).getTime(),
            )
            .reverse()
            .map((repo: repoType, index: number) => (
              <RepoCard repo={repo} i={index} />
            ))}
        </SimpleGrid>
      </Box>
    </>
  );
}

export async function getServerSideProps() {
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_HOST ||
      `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    }/api/github`,
  );

  const { stars, repos, followers } = await response.json();
  return { props: { stars, repos, followers } };
}

export default Projects;
