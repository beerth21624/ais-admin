import { Button, TextInput } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { HiSearch } from 'react-icons/hi'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Nodata from '../../components/common/Nodata'
import CharacterCard from './components/CharacterCard'
import ModalActionCharacter from './components/ModalActionCharacter'
const MySwal = withReactContent(Swal)



//service
import { CharacterService } from '../../services'

type Character = {
  name: string;
  image_name?: string;
  image_url: string;
  description: string;
  prompt?: string;
  record_status?: string;
}

const ManageCharacterView = () => {
  const [isOpenActionModal, setIsOpenActionModal] = useState<boolean>(false)
  const [characters, setCharacters] = useState<Character[]>([])
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    callCharacterApi()
  }, [])

  const callCharacterApi = async () => {
    try {
      const response = await CharacterService.getCharacters()
      setCharacters(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  const CallApiCreateCharacter = async (character: any) => {
    try {
      const response = await CharacterService.createCharacter(character)
      if (response.status === 201) {
        MySwal.fire({
          icon: 'success',
          title: 'สำเร็จ!',
          text: 'เพิ่มหลานสำเร็จ',
          showConfirmButton: false,
          timer: 1500,
        })
        callCharacterApi()
      }
    } catch (e) {
      MySwal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: 'ไม่สามารถเพิ่มหลานได้',
      })
    }
  }



  const filteredCharacters = characters.filter(character =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col h-full">
      <h1 className="text-2xl font-bold mb-4">หลาน</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="w-1/3">
          <TextInput
            icon={HiSearch}
            placeholder="Search หลาน..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button color="success"
          onClick={() => {
            setIsOpenActionModal(true)
          }}
        >เพิ่มหลาน</Button>
      </div>
      {filteredCharacters.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredCharacters.map((character, index) => (
            <CharacterCard key={index} character={character} />
          ))}
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center h-full'>
          <Nodata />
        </div>
      )}
      <ModalActionCharacter
        isOpen={isOpenActionModal}
        onClose={() => {
          setIsOpenActionModal(false)
        }}
        onSubmit={(formData) => {
          CallApiCreateCharacter(formData)
          setIsOpenActionModal(false)
        }}
      />
    </div>
  )
}

export default ManageCharacterView