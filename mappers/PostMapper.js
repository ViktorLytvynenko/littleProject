class PostMapper {
    static RequestDtoToEntity(requestDto) {
        console.log(requestDto, "requestDtoToEntity");
        return ({
            author: requestDto.author,
            title: requestDto.title,
            content: requestDto.content,
            picture: requestDto.picture
        });
    }

    static EntityToResponseDTO(entity) {
        return {
            id: entity._id,
            author: entity.author,
            title: entity.title,
            content: entity.content,
            picture: entity.picture
        };
    }
}

export default PostMapper;