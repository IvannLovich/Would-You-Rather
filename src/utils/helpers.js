function getPercentage(totalUsers, votes) {
  const percentage = (votes * 100) / totalUsers;
  return Math.round(percentage);
}

export default getPercentage;
