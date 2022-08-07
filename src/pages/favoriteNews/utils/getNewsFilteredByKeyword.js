export const getNewsFilteredByKeyword = (news, keyword) => {
  return news.filter((currentNews) => {
		return (
			(currentNews.title && currentNews.title.toLowerCase().includes(keyword.toLowerCase())) ||
			(currentNews.description && currentNews.description.toLowerCase().includes(keyword.toLowerCase())) ||
			(currentNews.content && currentNews.content.toLowerCase().includes(keyword.toLowerCase()))
		);
	});
};
