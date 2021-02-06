import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import useLocalStorage from '../../../hooks/useLocalStorage';

import Button from '../../../components/Button';
import TextField from '../../../components/TextField';
import Card from '../../../components/Card';
import TextArea from '../../../components/TextArea';
import Logo from '../../../components/Logo';

const communityCategories = [
  {
    name: 'DLT & Blockchain',
    color: 'denim',
    subtitle: 'Ideal for small, functional Web3 teams aiming to',
    description: [
      'keep accounting & run proposals',
      'fair, milestone-based rewards & payments to members',
      'efficiently distribute tasks',
      'get initial fundings for their project',
      'coordinate for hackathons & sprints',
    ],
  },
  {
    name: 'Art & Lifestyle',
    color: 'rain-forest',
    subtitle: 'For artists & creative minds who want to:',
    description: [
      'keep accounting & run proposals',
      'manage multi-disciplinary projects & distribute tasks',
      'distribute shares & royalties fairly',
      'maintain continuous funding flow',
      'update scores & rank while gaming',
    ],
  },
  {
    name: 'Local Community',
    color: 'alizarin',
    subtitle: 'For neighbors, condos & small local clubs who need to',
    description: [
      'hold a common treasury',
      'vote for local proposals based on reputation & commitment',
      'share & track common resources',
      'organize & fund local projects',
      'divide tasks for mutual support',
    ],
  },
];

function CommunityCreate() {
  const { register, handleSubmit, setValue, watch } = useForm();
  const selectedCategory = watch('category');
  const router = useRouter();

  const handleCreateCommunity = async data => {
    // TODO: Handle validation, error display and loading
    const { name, description, category } = data;
    localStorage.setItem('create-community', JSON.stringify({
      name,
      description,
      category,
    }))
    localStorage.setItem('category', category);
    await router.push(`/community/create/pick-skills?category=${encodeURIComponent(category)}`);
  };

  useEffect(() => {
    register('category', { required: true });
  }, [register]);

  return (
    <form
      className="flex flex-col w-full h-screen"
      onSubmit={handleSubmit(handleCreateCommunity)}
    >
      <div className="flex flex-col flex-1 md:flex-row md:items-center">
        <div
          className="grid content-center w-full h-full p-8 bg-center bg-cover md:flex-1"
          style={{ backgroundImage: 'url(/background-image.svg)' }}
        >
          <Logo className="pb-8 md:absolute" />
          <Card className="flex flex-col items-center mx-auto">
            <div className="mb-8 text-3xl font-bold text-center text-gray-900">
              Welcome to Distributed Town!
            </div>
            <p className="mb-6 text-lg text-center">
              This is your first Community. Pick up a simple, intuitive{' '}
              <strong>name</strong>.
            </p>
            <label className="flex flex-col w-full md:w-2/3">
              <strong>Name </strong>
              <TextField
                id="name"
                name="name"
                type="text"
                ref={register({ required: true })}
                required
                className="w-full"
              />
            </label>
            <label className="flex flex-col w-full md:w-2/3">
              <strong>Description</strong>
              <TextArea
                required
                name="description"
                maxLength="280"
                ref={register({ required: true, maxLength: 280 })}
                className="w-full"
              />
            </label>
          </Card>
        </div>
        <div className="p-2 text-center md:flex-1">
          <h1 className="mb-8 text-3xl font-bold">Select community type</h1>
          <div className="grid justify-center gap-4 md:justify-items-center">
            <CategoryCard
              category={communityCategories[0]}
              selected={communityCategories[0].name === selectedCategory}
              onSelect={categoryName => setValue('category', categoryName)}
            />
            <CategoryCard
              category={communityCategories[1]}
              selected={communityCategories[1].name === selectedCategory}
              onSelect={categoryName => setValue('category', categoryName)}
            />
            <CategoryCard
              className="md:col-span-2"
              category={communityCategories[2]}
              selected={communityCategories[2].name === selectedCategory}
              onSelect={categoryName => setValue('category', categoryName)}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full p-4 bg-white">
        <Button filled type="submit">
          Create Community
        </Button>
      </div>
    </form>
  );
}

function CategoryCard({ category, selected, onSelect, className }) {
  const { name, color, subtitle, description } = category;

  return (
    <Card
      className={`flex flex-col space-y-4 overflow-hidden ${className}`}
      key={name}
      color={color}
    >
      <h1 className={`text-${color} font-black text-xl`}>{name}</h1>
      <div className="h-full bg-white">
        <div className="text-left">
          <p className="mb-2 text-sm text-center">{subtitle}</p>
          <ul className="text-xs font-light list-disc">
            {description.map((desc, index) => {
              return <li key={index}>{desc}</li>;
            })}
          </ul>
        </div>
      </div>
      {selected ? (
        <Button disabled color={color} filled>
          Selected
        </Button>
      ) : (
          <Button color={color} filled onClick={() => onSelect(name)}>
            Select
          </Button>
        )}
    </Card>
  );
}

export default CommunityCreate;
