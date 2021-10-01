import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
	FlatList,
} from 'react-native';
import { Button, SkillCard } from '../components';

interface SkillData {
	id: string;
	name: string;
}

export function Home(){
	const [greeting, setGreeting] = useState('');

	const [newSkill, setNewSkill] = useState('');
	const [mySkills, setMySkills] = useState<SkillData[]>([]);

	function handleAddNewSkill(){
		const data = {
			id: String(Math.floor(Math.random() * 1000)),
			name: newSkill
	}

    setMySkills(oldState => [...oldState, data]);
		setNewSkill('');
  }

	function handleRemoveSkill(id: string) {
		setMySkills(oldState => oldState.filter(
			skill => skill.id !== id
		))
	}

	useEffect(() => {
		const currentHour = new Date().getHours();

		if (currentHour < 12) {
			setGreeting('Good morning!');
		} else if (currentHour >= 12 && currentHour < 18) {
			setGreeting('Good afternoon!');
		} else {
			setGreeting('Good night!');
		}
	}, [])

	return (
		<View style={styles.container}>
			<Text style={styles.title}>
				{ greeting }
			</Text>
			<Text style={styles.description}>
				Write a skill in text input then press the button. To delete, press the skill.
			</Text>
			<TextInput
				style={styles.input}
				placeholder="New skill"
				placeholderTextColor="#555"
				selectionColor="#555"
				value={newSkill}
				onChangeText={setNewSkill}
		/>
			<Button 
				title="Add"
				disabled={!newSkill}
				onPress={handleAddNewSkill}
			/>
			{mySkills.length > 0 && (
				<>
					<Text style={[styles.title, {marginVertical: 40}]}>
						My Skills   
					</Text>
					<FlatList
						data={mySkills}
						keyExtractor={item => item.id}
						renderItem={({ item }) => (
							<SkillCard 
								skill={item.name} 
								onPress={() => handleRemoveSkill(item.id)}
							/>
						)}
					/>
				</>
			)}
		</View>
  )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#121015',
		paddingHorizontal: 20,
		paddingVertical: 70,
	},
	title: {
		color: '#FFF',
		fontSize: 24,
		fontWeight: 'bold'
	},
	description: {
		color: '#FFF',
		fontSize: 20,
		marginTop: 12,
	},
	input: {
		backgroundColor: '#1F1E25',
		color: '#FFF',
		fontSize: 18,
		padding: Platform.OS === 'ios' ? 15 : 10,
		marginTop: 30,
		borderRadius: 7
	},
})