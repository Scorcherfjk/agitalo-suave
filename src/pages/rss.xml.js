import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function GET(context) {
	const posts = await getCollection('blog');
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts
			.filter((post) => !post.data.draft)
			.map((post) => ({
				title: post.data.title,
				link: `/blog/${post.id}/`,
				pubDate: post.data.date,
				description: post.data.excerpt,
			})),
	});
}
