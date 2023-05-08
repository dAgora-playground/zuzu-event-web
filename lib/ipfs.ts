export const ipfsLinkToHttpLink = (
	rawLink: string,
	config?: { origin?: string | null }
): string => {
	if (!rawLink) {
		return "";
	}

	const origin = config?.origin ?? null;
	const link = rawLink.replace(/^ipfs:\/\//, "/ipfs/");

	if (origin === null) {
		return link;
	} else {
		if (link.startsWith("/")) {
			return origin + link;
		} else {
			return link;
		}
	}
};