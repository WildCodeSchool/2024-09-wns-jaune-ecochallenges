import { ChallengeCarouselCard, CarouselComponent } from '@/components';

export const Home = () => {
  const ecoChallenges = [
    {
      id: '1',
      name: 'No Plastic Week',
      imageUrl:
        'https://images.pexels.com/photos/256221/pexels-photo-256221.jpeg?auto=compress&cs=tinysrgb&h=600',
      users: ['Lina', 'Matthieu', 'Sophie'],
      description:
        'Avoid single-use plastics for 7 days. Bring your own bags, bottles, and containers!',
      tags: ['plastic-free', 'zero waste', 'sustainable living'],
    },
    {
      id: '2',
      name: 'Bike to Work',
      imageUrl:
        'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&h=600',
      users: ['Thomas', 'Nina', 'Leo'],
      description:
        'Ditch the car and ride your bike to work or school every day this week.',
      tags: ['eco transport', 'reduce emissions', 'cycling'],
    },
    {
      id: '3',
      name: 'Veggie Day',
      imageUrl:
        'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&h=600',
      users: ['Claire', 'Maxime', 'Alice'],
      description: 'Go meat-free for one day to reduce your carbon footprint.',
      tags: ['plant-based', 'low carbon', 'healthy eating'],
    },
    {
      id: '4',
      name: 'Neighborhood Cleanup',
      imageUrl:
        'https://images.pexels.com/photos/3187291/pexels-photo-3187291.jpeg?auto=compress&cs=tinysrgb&h=600',
      users: ['Julien', 'Emma', 'Yasmine'],
      description:
        'Join your neighbors and pick up litter in your local park or street.',
      tags: ['community', 'litter removal', 'outdoor'],
    },
    {
      id: '5',
      name: 'Cold Shower Challenge',
      imageUrl:
        'https://images.pexels.com/photos/1656666/pexels-photo-1656666.jpeg?auto=compress&cs=tinysrgb&h=600',
      users: ['Lucas', 'Camille', 'Jade'],
      description:
        'Take only 3-minute cold showers for a week to save water and energy.',
      tags: ['water saving', 'energy efficient', 'mindfulness'],
    },
  ];

  return (
    <>
      <h1 className="mb-8 rounded-full text-center text-3xl font-thin">
        🌱 Welcome to Eco-challenges 🌱
      </h1>
      <CarouselComponent
        data={ecoChallenges}
        CardComponent={ChallengeCarouselCard}
      />
    </>
  );
};
